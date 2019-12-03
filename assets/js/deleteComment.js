import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");
const deleteBtnArr = commentList.getElementsByClassName("deleteBtn");

const decreaseCommentNum = () => {
  commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) - 1;
};

const fakeDeleteComment = li => {
  li.remove();
  decreaseCommentNum();
};

const deleteComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/deletecomment`,
    method: "POST",
    data: comment
  });
};

const handleDeleteComment = event => {
  const li = event.target.closest("li");
  const comment = li.querySelector("span").innerHTML;
  deleteComment(comment);
  fakeDeleteComment(li);
};

const init = () => {
  deleteBtnArr.forEach(deleteBtn =>
    deleteBtn.addEventListener("click", handleDeleteComment)
  );
};

if (commentList) {
  init();
}

export default handleDeleteComment;
