for FILE in $(git ls-files)
do
    TIME=$(git log --pretty=format:%cd --date=iso --date-order --reverse -- "$FILE" | head -n 1)

    # Choose 1 version.
    # This is for BSD date (macOS, FreeBSD, etc)
    #TIME=$(date -j -f '%Y-%m-%d %H:%M:%S %z' "$TIME" +%Y%m%d%H%M.%S)

    # And this is the equivalent for GNU coreutils date (Linux)
    TIME=$(date --date="$TIME" +%Y%m%d%H%M.%S)

    touch -m -t "$TIME" "$FILE"
done