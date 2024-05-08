import clsx from "clsx";
import { forwardRef, ComponentProps } from "react";
import { HTMLAttributes } from "react";
import "./Document.module.css";

interface DocumentLayoutProps extends ComponentProps<"div"> {
  header: React.ReactNode;
}

const DocumentLayout = forwardRef<HTMLDivElement, DocumentLayoutProps>(
  ({ children, header, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "document-layout",
          className,
          "flex",
          "flex-col",
          "h-full"
        )}
        {...props}
        ref={ref}
      >
        <header className="document-header bg-gray-200 p-4">{header}</header>
        <main className="document-main flex-grow p-4">{children}</main>
      </div>
    );
  }
);

DocumentLayout.displayName = "DocumentLayout";

export default DocumentLayout;
