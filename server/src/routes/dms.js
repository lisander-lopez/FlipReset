const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const DirMsg = require("../models/DirMsg")
const router = express.Router();

// Get all convos from DB. 
router.get("/", async (req, res) => {
  try {
    const allDMs = await DirMsg.find();
    res.status(200).json(allDMs);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// make a new user in the DM's portion of the DB
router.post("/", async (req, res) => {
  const userDMs = new DirMsg({
    userID: req.body.userID,
    convos: [],
  });
  try {
    const dbUser = await userDMs.save();
    res.status(200).json(dbUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get a user; used to obtain their list of convos
router.get("/:userID", async (req, res) => {
  try {
    const userID = await DirMsg.findOne({ userID: req.params.userID });
    res.status(200).json(userID);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// add a new convo to a user's list of convos
router.post("/:userID", async (req, res) => {
  // FIRST CHECK IF UID IS IN DATABASE
  const userID = req.body.userID;
  const convo = [{
    recipient: req.body.recipient,
    messages: [],
  }];
  try {
    // Add Post to associated Author in User Collection
    const userConvo = await DirMsg.findOneAndUpdate(
      { userID: userID },
      { $push: { convos: convo } },
      { new: true }
    );
    res.status(200).json(userConvo);
  } catch (error) {
    res.status(400).json(JSON.stringify(error));
  }
});

// Post message to a conversation
router.post("/:userID/convos/:recipID", async (req, res) => {
  const message = req.body.message;
  const userConvo = await DirMsg.findOne({ userID: req.params.userID });
  try {
    for (let i = 0; i < userConvo.convos.length; i++) {
      if(userConvo.convos[i].recipientID == req.params.recipID){
        userConvo.convos[i].push(message);
      }
    }
  } catch(e){
    res.status(400).json({messgae: e});
  }
});

module.exports = router;