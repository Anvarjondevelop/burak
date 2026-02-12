console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });
  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();
    console.log("id:", id);
    console.log("productStatus:", productStatus);
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      console.log("responce", response);
      const result = response.data;
      if (result.data) {
        console.log("Product Updated!");
        $(".new-product-status").blur();
      } else alert("Product Update failed");
    } catch (err) {
      console.log(err);
      alert("Product Update failed");
    }
  });
});

function validateForm() {
  const productName = $(".product-name").val();
  const productStatus = $(".product-status").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();

  if (
    productName === "" ||
    productStatus === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === ""
  ) {
    alert("Please insert all details!");
    return false;
  }
}

function previewFileHandler(input, order) {
  const imgClassName = input.className;
  // console.log("input", input);
  // console.log("imgClassName:", imgClassName);

  const file = $(`.${imgClassName}`)[0].files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpg, jpeg, png ");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log("reader", reader);
      reader.onload = function () {
        // onload fileni o'qib bo'lganingda degani
        $(`#image-section-${order}`).attr("src", reader.result);
      };
    }
  }
}
