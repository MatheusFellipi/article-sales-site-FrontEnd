import { toast } from "react-toastify";
import { ValuesArticleSubmitType } from "../../../types/articles";

export const check = (values: ValuesArticleSubmitType) => {
  if (values.amount === 0) {
    toast("Please enter a non-zero amount");
    return true;
  }
  if (values.themes.length === 0) {
    toast("Please choose at least one theme");
    return true;
  }
  const hastext = values.text.some((node) =>
    node?.children.some((child) => child.text === "Tell your story...")
  );
  if (hastext) {
    toast("Article text should not be empty");
    return true;
  }
  if (!values.title.trim()) {
    toast("Title should not be empty");
    return true;
  }
  return false;
};
