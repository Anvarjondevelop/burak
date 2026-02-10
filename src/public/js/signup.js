console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");

  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      console.log("window:", window);
      console.log("this[0]:", this[0]);
      const fileType = uploadFile["type"];
      console.log("uploadFile:", uploadFile);
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpg, jpeg, png ");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).closest(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  const memberNick = $("member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all requred inputs");
    return false;
  }
  if (memberPassword !== confirmPassword) {
    alert("Password is different, please check!");
    return false;
  }

  const memmerImage = $(".member-image").get(0).files[0]
    ? $(".member-image")
    : null;
  if (!memmerImage) {
    alert("Please insert restaurant image! ");
    return false;
  }
}
