# Chotto Architecture Diagram

```
+------------------------------------------------------+
|                    Application UI                    |
|                                                      |
|  +-------------------+  +------------------------+   |
|  |    Layouts        |  |      Containers        |   |
|  |-------------------|  |------------------------|   |
|  | - BaseLayout      |  | - BaseContainer        |   |
|  | - ExtendedLayout  |  | - FloatContainer       |   |
|  | - FeedLayout      |  +------------------------+   |
|  | - ChatWrapper     |                            |   |
|  | - AdaptiveExtended|                            |   |
|  +-------------------+                            |   |
|         |                                         |   |
|         v                                         |   |
|  +-------------------+  +------------------------+|   |
|  |    Components     |  |       Modals           ||   |
|  |-------------------|  |------------------------||   |
|  | - WABAAttachment  |  | - (various modal comps)||   |
|  | - FilePreview     |  +------------------------+|   |
|  | - etc.            |                            |   |
|  +-------------------+                            |   |
|         |                                         |   |
|         v                                         |   |
|  +------------------------------------------------+   |
|  |                  Messages                       |   |
|  |-------------------------------------------------|   |
|  | - TextMessage   - AudioMessage                  |   |
|  | - ImageMessage  - VideoMessage                  |   |
|  | - FileMessage   - CallMessage                   |   |
|  | - DateMessage   - SystemMessage                 |   |
|  | - TypingMessage                                 |   |
|  | - Reply*Message (ReplyText, ReplyFile, etc.)    |   |
|  | - BaseReplyMessage                              |   |
|  | - LinkPreview                                   |   |
|  +-------------------------------------------------+   |
|                                                      |
+------------------------------------------------------+

Legend:
- Layouts: Define the grid/column structure and slots for chat UI.
- Containers: Higher-level wrappers for groups of components.
- Components: UI elements (attachment uploaders, previews, etc).
- Messages: All message types supported (text, file, image, reply, etc).
- Modals: Dialog/modal components for auxiliary UI.
```

## Notes

- All elements are written in Vue 3 and exported via `src/library/index.ts` for modular use.
- Layouts provide the structure; messages and components fill layout slots.
- Storybook and demo directories provide usage examples.
- Customization is possible by composing these building blocks.

---

For a visual diagram, you can use this as a basis to draw a box-and-lines chart in tools like draw.io, Excalidraw, or in your design documentation.
