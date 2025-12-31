Base on stagged changes.

## Subject line (first line)

- Maximum length of 50 characters.
- Capitalize the first word.
- Add a scope in parentheses at the end. Scope is determined by the most specific name of nearest parent directories of the stagged files.
- Don't end with a period.

## Body lines (detailed explanation)

- Maximum length of 65 characters per line.
- Separate from Subject line with a blank line.
- Use lists (`-`) if multiple changes are explained.

## Example

### Commit message with only one file changed

```
Add validation for user email input ({scope})
```

### Commit message with more than one file changed

Note: 2 files changed in this example.

```
Add validation for user email input ({scope})

- {file-1}: Add email field to User model
- {file-2}: Perform validation on email format
```
