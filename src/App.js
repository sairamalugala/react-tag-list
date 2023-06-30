import "./styles.css";
import { memo, useEffect, useState } from "react";

const TagList = memo(({ tags, tagRemoveHandler, errIndex = -1 }) => {
  return (
    <div className="taglist-tags">
      {tags.map((tag, index) => (
        <div
          className={errIndex === index ? "taglist-tag error" : "taglist-tag"}
          key={tag}
        >
          <span className="taglist-tag-text">{tag}</span>
          <span
            className="taglist-tag-remove"
            onClick={() => tagRemoveHandler(tag)}
          >
            <span className="icon-close"></span>
          </span>
        </div>
      ))}
    </div>
  );
});

export default function App() {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [errIndex, setErrIndex] = useState(-1);
  useEffect(() => {
    let timer;
    if (errIndex != -1) {
      timer = setTimeout(() => {
        setErrIndex(-1);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [errIndex]);
  const keyDownListener = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      let index = tags.indexOf(tag);
      if (index > -1) {
        return setErrIndex(index);
      }
      setTags([...tags, tag]);
      setTag("");
    }
  };
  const changeHandler = (e) => {
    setTag(e.target.value);
  };
  const tagRemoveHandler = (t) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag !== t);
    });
  };
  return (
    <div className="App">
      <div className="taglist">
        <TagList
          tags={tags}
          tagRemoveHandler={tagRemoveHandler}
          errIndex={errIndex}
        />
        <textarea
          className="taglist-input"
          onKeyDown={keyDownListener}
          value={tag}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}
