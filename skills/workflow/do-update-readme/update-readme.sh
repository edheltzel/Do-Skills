#!/usr/bin/env bash
# Regenerates nested bucket (and engineering tech) READMEs plus the short
# bucket table in the root README.md from SKILL.md frontmatters.
# Skills live under skills/<bucket>/<skill>/SKILL.md or
# skills/<bucket>/<tech>/<skill>/SKILL.md. Bundled copies under references/ are ignored.
# Usage: bash skills/workflow/do-update-readme/update-readme.sh
set -euo pipefail

ROOT="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
README="$ROOT/README.md"
SKILLS_DIR="$ROOT/skills"
GROUPINGS_FILE="$ROOT/skills.sh.json"

# Bucket render order and display titles. Descriptions come from skills.sh.json,
# their authoritative owner. Any unlisted bucket is appended with no blurb.
BUCKET_ORDER="core engineering content harness slop-guard workflow operations personal private"
PROMOTED="core engineering content harness slop-guard workflow"

bucket_title() {
    case "$1" in
        core)         echo "Core" ;;
        engineering)  echo "Engineering" ;;
        content)      echo "Content" ;;
        harness)      echo "Harness" ;;
        slop-guard)   echo "Slop Guard" ;;
        workflow)     echo "Workflow" ;;
        operations)   echo "Operations" ;;
        personal)     echo "Personal" ;;
        private)      echo "Private" ;;
        *)            echo "$1" ;;
    esac
}

tech_title() {
    case "$1" in
        frontend)    echo "Frontend" ;;
        typescript)  echo "TypeScript" ;;
        swift)       echo "Swift" ;;
        general)     echo "General" ;;
        rust)        echo "Rust" ;;
        python)      echo "Python" ;;
        go)          echo "Go" ;;
        elixir)      echo "Elixir" ;;
        *)           echo "$1" ;;
    esac
}

bucket_blurb() {
    title=$(bucket_title "$1")
    node -e '
const fs = require("fs");
const [path, title] = process.argv.slice(1);
const config = JSON.parse(fs.readFileSync(path, "utf8"));
const group = config.groupings.find((candidate) => candidate.title === title);
process.stdout.write(group?.description ?? "");
' "$GROUPINGS_FILE" "$title"
}

is_promoted() {
    echo "$PROMOTED" | grep -qw "$1"
}

group_file=$(mktemp)
trap 'rm -f "$group_file"' EXIT

# Parse name and description from a SKILL.md file.
# Handles inline values (quoted or unquoted) and block scalars (> and |).
# Outputs: <name><TAB><description>
parse_skill() {
    awk '
    BEGIN { cnt=0; name=""; desc=""; in_desc=0 }
    /^---[[:space:]]*$/ {
        cnt++
        if (cnt == 2) exit
        next
    }
    cnt != 1 { next }
    /^description:[[:space:]]*[>|]/ { in_desc=1; next }
    /^description:[[:space:]]/ {
        in_desc=0
        val=$0; sub(/^description:[[:space:]]*/, "", val)
        gsub(/^[[:space:]"]+|[[:space:]"]+$/, "", val)
        desc=val
        next
    }
    /^name:[[:space:]]/ {
        in_desc=0
        val=$0; sub(/^name:[[:space:]]*/, "", val)
        gsub(/^[[:space:]"]+|[[:space:]"]+$/, "", val)
        name=val
        next
    }
    /^[a-zA-Z]/ { in_desc=0; next }
    in_desc && /^[[:space:]]/ {
        line=$0; sub(/^[[:space:]]+/, "", line)
        desc=(desc=="" ? line : desc " " line)
        next
    }
    END { printf "%s\t%s\n", name, desc }
    ' "$1"
}

# Return the first sentence of a string. A sentence ends at a . ! or ? that is
# followed by whitespace or end of line; a period inside a token (AGENTS.md,
# ARCHITECTURE.md) is not a boundary.
first_sentence() {
    awk '{
        if (match($0, /[.!?]([[:space:]]|$)/))
            print substr($0, 1, RSTART)
        else
            print $0
        exit
    }' <<< "$1"
}

escape_cell() {
    printf '%s' "$1" | sed 's/|/\\|/g'
}

# Fill $group_file with name<TAB>reldir<TAB>short-desc for SKILL.md files under $1.
collect_skills() {
    search_root="$1"
    : > "$group_file"
    while IFS= read -r skill_file; do
        [ -n "$skill_file" ] || continue
        result=$(parse_skill "$skill_file")
        name=$(printf '%s' "$result" | cut -f1)
        desc=$(printf '%s' "$result" | cut -f2-)
        [ -n "$name" ] && [ -n "$desc" ] || continue
        short=$(first_sentence "$desc")
        reldir="${skill_file#"$ROOT"/}"
        reldir="${reldir%/SKILL.md}"
        printf '%s\t%s\t%s\n' "$name" "$reldir" "$short" >> "$group_file"
    done <<EOF
$(find "$search_root" -name SKILL.md ! -path '*/references/*' 2>/dev/null | sort)
EOF
    [ -s "$group_file" ] || return 1
    sort -f -o "$group_file" "$group_file"
}

write_skill_table() {
    prefix="$1"
    while IFS=$'\t' read -r name reldir desc; do
        rel="${reldir#"$prefix"}"
        printf '| [`%s`](./%s/) | %s |\n' "$name" "$rel" "$(escape_cell "$desc")"
    done < "$group_file"
}

write_install_block() {
    cat <<'EOF'
## Installation

For any coding agent that supports [Agent Skills](https://agentskills.io):

```bash
npx skills add edheltzel/Do-Skills
```

Install one skill by exact name (`icm-grill` is unprefixed; the rest use `do-`):

```bash
npx skills add edheltzel/Do-Skills --skill=<skill-name>
```

EOF
}

# Write a Beagle-docs-style README at $1.
# $2 = H1 title, $3 = blurb, $4 = skills/ path prefix to strip from links,
# $5 = relative path from this README to repo root README.md,
# $6 = optional docs relative path (empty to omit).
write_readme() {
    dest="$1"
    title="$2"
    blurb="$3"
    prefix="$4"
    catalog_rel="$5"
    docs_rel="${6:-}"

    {
        printf '# %s\n\n' "$title"
        [ -n "$blurb" ] && printf '%s\n\n' "$blurb"
        write_install_block
        printf '## Skills\n\n'
        printf '| Skill | Description |\n'
        printf '|-------|-------------|\n'
        write_skill_table "$prefix"
        printf '\n## See Also\n\n'
        printf -- '- [Skill catalog](%s) — every bucket in this repo\n' "$catalog_rel"
        if [ -n "$docs_rel" ]; then
            printf -- '- [Docs](%s) — human-facing pages for these skills\n' "$docs_rel"
        fi
    } > "$dest"
}

write_bucket_readme() {
    bucket="$1"
    title=$(bucket_title "$bucket")
    blurb=$(bucket_blurb "$bucket")
    docs_rel=""
    if is_promoted "$bucket"; then
        docs_rel="../../docs/${bucket}/"
    fi
    write_readme \
        "$SKILLS_DIR/$bucket/README.md" \
        "$title" \
        "$blurb" \
        "skills/${bucket}/" \
        "../../README.md" \
        "$docs_rel"
}

write_tech_readmes() {
    bucket="engineering"
    while IFS= read -r tech_dir; do
        [ -n "$tech_dir" ] || continue
        tech=$(basename "$tech_dir")
        collect_skills "$tech_dir" || continue
        write_readme \
            "$tech_dir/README.md" \
            "$(tech_title "$tech")" \
            "Engineering skills for ${tech}." \
            "skills/engineering/${tech}/" \
            "../../../README.md" \
            "../../../docs/engineering/${tech}/"
    done <<EOF
$(find "$SKILLS_DIR/$bucket" -mindepth 1 -maxdepth 1 -type d | sort)
EOF
}

# Buckets in preferred order, then any others discovered on disk.
found_buckets=$(find "$SKILLS_DIR" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)
ordered=""
for b in $BUCKET_ORDER; do
    echo "$found_buckets" | grep -qx "$b" && ordered="$ordered $b"
done
for b in $found_buckets; do
    echo "$BUCKET_ORDER" | grep -qw "$b" || ordered="$ordered $b"
done

root_section=$(mktemp)
trap 'rm -f "$group_file" "$root_section"' EXIT
{
    printf '| Bucket | Coverage |\n'
    printf '|--------|----------|\n'
} > "$root_section"


total=0
bucket_count=0
for b in $ordered; do
    collect_skills "$SKILLS_DIR/$b" || continue
    count=$(wc -l < "$group_file" | tr -d ' ')
    total=$((total + count))
    bucket_count=$((bucket_count + 1))
    write_bucket_readme "$b"
    title=$(bucket_title "$b")
    blurb=$(bucket_blurb "$b")
    printf '| [%s](./skills/%s/) | %s |\n' "$title" "$b" "$(escape_cell "$blurb")" >> "$root_section"
done
printf '\n' >> "$root_section"

write_tech_readmes

awk -v section="$root_section" '
    /<!-- skills-start -->/ { print; print ""; while ((getline line < section) > 0) print line; skip=1; next }
    /<!-- skills-end -->/ { skip=0 }
    !skip { print }
' "$README" > "$README.tmp" && mv "$README.tmp" "$README"

echo "✓ Updated README.md and $bucket_count bucket READMEs ($total skills)"
