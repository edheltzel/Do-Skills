#!/usr/bin/env bash
# Regenerates the Available Skills section in README.md from SKILL.md frontmatters.
# Skills live under skills/<bucket>/<skill>/SKILL.md; the section is grouped by bucket.
# Usage: bash skills/authoring/do-update-readme/update-readme.sh
set -euo pipefail

ROOT="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
README="$ROOT/README.md"
SKILLS_DIR="$ROOT/skills"

# Bucket render order and their one-line blurbs. Any bucket found on disk but not
# listed here is appended alphabetically with no blurb.
BUCKET_ORDER="core engineering authoring slop-guard workflow operations private"

bucket_title() {
    case "$1" in
        core)         echo "Core" ;;
        engineering)  echo "Engineering" ;;
        authoring)    echo "Authoring" ;;
        slop-guard)   echo "Slop Guard" ;;
        workflow)     echo "Workflow" ;;
        operations)   echo "Operations" ;;
        private)      echo "Private" ;;
        *)            echo "$1" ;;
    esac
}

bucket_blurb() {
    case "$1" in
        core)         echo "Essential, stack-agnostic safeguards and adversarial-thinking tools reached for by default across setup, implementation, testing, review, and shipping." ;;
        engineering)  echo "Code design and implementation practices, from general principles to language-, framework-, and platform-specific craft." ;;
        authoring)    echo "Producing and refining artifacts - technical prose, documentation, skills, and visual media." ;;
        slop-guard)   echo "Catching AI slop — restating output in plain human language and stripping jargon-heavy writing." ;;
        workflow)     echo "Source-control, pull-request, and project-tracking tooling for day-to-day delivery." ;;
        operations)   echo "Operating AI agents and driving machines - delegation, evaluation, prompt audits, memory recall, and browser or computer automation." ;;
        private)      echo "Scope, not topic: this repository's own tooling. Not portable." ;;
        *)            echo "" ;;
    esac
}

section_file=$(mktemp)
group_file=$(mktemp)
trap 'rm -f "$section_file" "$group_file"' EXIT

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

# Emit the grouped Markdown for one bucket into $section_file.
# Args: bucket name. Returns nonzero (skips output) if the bucket has no skills.
render_bucket() {
    bucket="$1"
    : > "$group_file"

    while IFS= read -r skill_file; do
        [ -n "$skill_file" ] || continue
        result=$(parse_skill "$skill_file")
        name=$(printf '%s' "$result" | cut -f1)
        desc=$(printf '%s' "$result" | cut -f2-)
        [ -n "$name" ] && [ -n "$desc" ] || continue
        short=$(first_sentence "$desc")
        reldir="skills/$bucket/$(basename "$(dirname "$skill_file")")"
        printf '%s\t%s\t%s\n' "$name" "$reldir" "$short" >> "$group_file"
    done <<EOF
$(find "$SKILLS_DIR/$bucket" -mindepth 2 -maxdepth 2 -name SKILL.md 2>/dev/null | sort)
EOF

    [ -s "$group_file" ] || return 1
    sort -f -o "$group_file" "$group_file"

    title=$(bucket_title "$bucket")
    blurb=$(bucket_blurb "$bucket")

    # Append this bucket's subsection to the top-level README section.
    # Links are repo-relative (./skills/<bucket>/<skill>/).
    {
        printf '### %s\n\n' "$title"
        [ -n "$blurb" ] && printf '%s\n\n' "$blurb"
        while IFS=$'\t' read -r name reldir desc; do
            printf '%s\n' "- [\`$name\`](./$reldir/)"
        done < "$group_file"
        printf '\n'
    } >> "$section_file"

    # Write the bucket's own README.md. Links are relative to the bucket dir
    # (./<skill>/) so they resolve when browsing inside the folder.
    {
        printf '# %s\n\n' "$title"
        [ -n "$blurb" ] && printf '%s\n\n' "$blurb"
        while IFS=$'\t' read -r name reldir desc; do
            printf '%s\n' "- [\`$name\`](./$(basename "$reldir")/)"
        done < "$group_file"
    } > "$SKILLS_DIR/$bucket/README.md"

    return 0
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

: > "$section_file"
total=0
for b in $ordered; do
    if render_bucket "$b"; then
        total=$((total + $(wc -l < "$group_file" | tr -d ' ')))
    fi
done

# Replace the region between <!-- skills-start --> and <!-- skills-end --> in README.md
awk -v section="$section_file" '
    /<!-- skills-start -->/ { print; print ""; while ((getline line < section) > 0) print line; skip=1; next }
    /<!-- skills-end -->/ { skip=0 }
    !skip { print }
' "$README" > "$README.tmp" && mv "$README.tmp" "$README"

echo "✓ Updated README.md with $total skills across $(echo $ordered | wc -w | tr -d ' ') buckets"
