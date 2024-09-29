import "highlight.js/styles/github.css"; 
import hljs from 'highlight.js';
import { useEffect } from 'react';

const CodeBlock = ({codeString} : { codeString: string }) => {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <pre>
            <code id="code" className={hljs.highlightAuto(codeString).language}>
                {codeString}
            </code>
        </pre>
    );
};

export default CodeBlock;
