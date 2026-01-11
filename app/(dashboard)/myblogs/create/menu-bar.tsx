import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image as ImageIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  SeparatorHorizontal,
  Link,
  Code,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import StorageDialog from "@/components/web/StorageDialog";
import { useCallback } from "react";
function MenuBar({ editor }: { editor: Editor | null }) {
  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  // for links

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      try {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert(String(e));
        }
      }
    }
  }, [editor]);

  // const editorState = useEditorState({
  //   editor,
  //   selector: (ctx) => ({
  //     isLink: ctx.editor && ctx.editor.isActive("link"),
  //   }),
  // });

  // for codeblock
  function toggleCode() {
    if (!editor) return;

    editor.commands.toggleCodeBlock();
  }

  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => setLink(),

      // preesed: editor.isActive("link"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
    {
      icon: <SeparatorHorizontal className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      preesed: editor.isActive("horizontalRule"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => toggleCode(),
      preesed: editor.isActive("codeBlock"),
    },
  ];
  return (
    <div className="sticky top-4 border rounded-md p-1 mb-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white [&_svg]:stroke-current"
          variant={"outline"}
          key={index}
          onPressedChange={() => option.onClick()}
        >
          {option.icon}
        </Toggle>
      ))}
      <StorageDialog
        bucketName={"blog-files"}
        allowedTypes={["image/*"]}
        path={"images"}
        onSelect={(url: string) => {
          editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        <ImageIcon />
      </StorageDialog>
      <button id="add" onClick={addYoutubeVideo}>
        Add YouTube video
      </button>
    </div>
  );
}

export default MenuBar;
