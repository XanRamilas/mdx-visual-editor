# MDX Visual Editor — Demo Document

Welcome to the demo file that shows off everything the editor can do.

## 📝 Text Formatting

Plain text, **bold text**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`, and a [link to the website](https://mdxeditor.dev).

> This is a blockquote. It can span multiple lines and contain **formatting** inside.
>
> — Quote author

## 📋 Lists

### Bullet List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Numbered List

1. Install the extension
2. Open a `.mdx` file
3. Edit the content
4. Click the save button

### Task List

- [x] Set up the toolbar
- [x] Add save button
- [x] Dark theme support
- [ ] Write documentation
- [ ] Publish to Marketplace

## 📊 Table

| Feature              | Status | Priority |
| -------------------- | :----: | -------: |
| Visual editing       | ✅     | High     |
| Tables               | ✅     | High     |
| Code blocks          | ✅     | Medium   |
| Dark theme           | ⏳     | High     |
| PDF export           | ⏳     | Low      |

## 💻 Code Blocks

### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return name.toUpperCase();
}

greet('MDX Editor');
```

### TypeScript

```typescript
interface SaveButtonProps {
  onSave: () => void;
  isSaving?: boolean;
}

const SaveButton = ({ onSave, isSaving = false }: SaveButtonProps) => {
  return (
    <ButtonWithTooltip title="Save" onClick={onSave} disabled={isSaving}>
      💾
    </ButtonWithTooltip>
  );
};
```

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    result = [0, 1]
    for _ in range(n - 2):
        result.append(result[-1] + result[-2])
    return result[:n]

print(fibonacci(10))
```

### Shell

```bash
npm install
npm run build
vsce package
code --install-extension mdx-visual-editor-1.0.0.vsix
```

## 🖼️ Image

![](halo-ce-cover.jpg)

## 📌 Divider

---

## 🔗 Links

- [MDX Editor documentation](https://mdxeditor.dev/)
- [VS Code Marketplace](https://marketplace.visualstudio.com/)
- [GitHub repository](https://github.com/)

## Conclusion

This file covers all the main Markdown elements:

- Headings (H1–H3)
- Formatting (bold, italic, strikethrough, code)
- Blockquotes
- Lists (bullet, numbered, task)
- Tables
- Code blocks (JS, TS, Python, Bash)
- Math formulas
- Images
- Links
- Dividers
- MDX components

**Perfect for screenshots!** 🎉