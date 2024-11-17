const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../helpers/cloudinary");

const router = express.Router();

// configure multer
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Uploading File" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Asset ID Is Required" });
    }

    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "Asset Deleted Successfully From Cloudinary",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Deleting File" });
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Bulk Upload Unsuccessful" });
  }
});

module.exports = router;
