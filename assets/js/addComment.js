import axios from "axios";
import handleDeleteComment from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");

const increaseCommentNum = () => {
  commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) + 1;
};

const fakeRealtimeComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const i = document.createElement("i");
  span.innerHTML = comment;
  li.appendChild(span);
  i.classList.add("fas", "fa-trash-alt");
  button.classList.add("deleteBtn");
  button.addEventListener("click", handleDeleteComment);
  button.appendChild(i);
  li.appendChild(button);
  commentList.prepend(li);
  increaseCommentNum();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/addcomment`,
    method: "POST",
    data: {
      comment
    }
  });
  fakeRealtimeComment(comment);
};

const handleAddComment = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleAddComment);
};

if (addCommentForm) {
  init();
}
