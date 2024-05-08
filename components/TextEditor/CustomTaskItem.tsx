import React, { forwardRef } from "react";
import TaskItem from "@tiptap/extension-task-item";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import Checkbox from "@/primitives/Checkbox";
import styles from "./CustomTaskItem.module.css";

type CustomTaskItemProps = NodeViewProps & {
  node: TaskItem;
};

// A custom task item that uses the checkbox primitive
const CustomTaskItem = TaskItem.extend({
  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapCheckbox);
  },
});

const TiptapCheckbox = forwardRef<HTMLDivElement, CustomTaskItemProps>(
  ({ node, updateAttributes, className }, ref) => {
    return (
      <NodeViewWrapper
        className={className}
        elementRef={ref}
        key={node.key}
      >
        <label className={styles.tiptapTaskItemCheckbox} contentEditable={false}>
          <Checkbox
            initialValue={false}
            checked={node.attrs.checked}
            onValueChange={(checked: boolean) => updateAttributes({ checked })}
          />
        </label>
        <NodeViewContent className={styles.tiptipTaskItemContent} />
      </NodeViewWrapper>
    );
  }
);

export default CustomTaskItem;
