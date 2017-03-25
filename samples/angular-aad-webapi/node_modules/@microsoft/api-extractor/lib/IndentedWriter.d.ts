/**
  * A utility for writing indented text.  In the current implementation,
  * IndentedWriter builds up an internal string buffer, which can be obtained
  * by calling IndentedWriter.getOutput().
  *
  * Note that the indentation is inserted at the last possible opportunity.
  * For example, this code...
  *
  *   writer.write('begin\n');
  *   writer.increaseIndent();
  *   writer.Write('one\ntwo\n');
  *   writer.decreaseIndent();
  *   writer.increaseIndent();
  *   writer.decreaseIndent();
  *   writer.Write('end');
  *
  * ...would produce this output:
  *
  *   begin
  *     one
  *     two
  *   end
  */
export default class IndentedWriter {
    private _output;
    private _indentStack;
    private _indentText;
    private _needsIndent;
    /**
     * Retrieves the indented output.
     */
    toString(): string;
    /**
     * Increases the indentation.  Normally the indentation is two spaces,
     * however an arbitrary prefix can optional be specified.  (For example,
     * the prefix could be "// " to indent and comment simultaneously.)
     * Each call to IndentedWriter.increaseIndent() must be followed by a
     * corresponding call to IndentedWriter.decreaseIndent().
     */
    increaseIndent(prefix?: string): void;
    /**
     * Decreases the indentation, reverting the effect of the corresponding call
     * to IndentedWriter.increaseIndent().
     */
    decreaseIndent(): void;
    /**
     * A shorthand for ensuring that increaseIndent()/decreaseIndent() occur
     * in pairs.
     */
    indentScope(scope: () => void): void;
    /**
     * Writes some text to the internal string buffer, applying indentation according
     * to the current indentation level.  If the string contains multiple newlines,
     * each line will be indented separately.
     */
    write(message: string): void;
    /**
     * A shorthand for writing an optional message, followed by a newline.
     * Indentation is applied following the semantics of IndentedWriter.write().
     */
    writeLine(message?: string): void;
    /**
     * Writes a string that does not contain any newline characters.
     */
    private _writeLinePart(message);
    private _writeNewLine();
    private _updateIndentText();
}
