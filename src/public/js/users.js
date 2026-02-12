console.log("Users frontend javascript file");
//document-ready
$(function () {
  $(".member-status").on("change", function (e) {
    console.log("e...", e);
    const id = e.target.id;
    console.log("ID", id);

    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus:", memberStatus);

    axios
      .post("/admin/user/edit", { _id: id, memberStatus: memberStatus })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;
        console.log("result:", result);

        if (result.data) {
          console.log("result.data", result.data);
          console.log("User Updated");
          $(".member-status").blur();
        } else {
          alert("User update failed");
        }
      })
      .catch((err) => {
        console.log("ERROR:", err);
        alert("User update failed");
      });
  });
});
