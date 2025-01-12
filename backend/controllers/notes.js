import Notes from '../models/notes.js';

export const addNote = async (req, res) => {
    const { text } = req.body;
    if (text.length < 6){
      return res.status(400).json({
        success: false,
        message: 'Text must be 6 characters or more',
      });
    }
    const {email} = req.user;
    console.log(req.user);
    const note = await Notes.create({
      text: text,
      email: email,
      todo: false,
    });
    const { _id: id} = note;
    res.status(201).json({
      success: true,
      result: { id, text, email},
    });
};

export const deleteNote = async(req,res)=>{
  const {id} = req.params;
  const note = await Notes.findOne({_id:id,email:req.user.email});
  console.log(note);
  if(!note){
      let oldNote = await Notes.findById(id);
      if(!oldNote){
          return res.status(404).json({
              success: false,
              message: 'Note not found',
          });
      }
      oldNote = await Notes.find({email:req.user.email});
      return res.status(404).json({
          success: false,
          message: 'You are not allowed to delete this note',
      });
  }
    const deletedNote = await Notes.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        result: deletedNote,
    });
}

export const getNotes = async(req,res)=>{
    const email = req.user.email;
    const notes = await Notes.find({email:email}).sort({_id:-1});
    res.status(200).json({success: true, result: notes});
}

export const updateNotes = async(req,res)=>{
    const {id} = req.params;
    const {text} = req.body;
    console.log(text);
    const note = await Notes.findOne({_id:id,email:req.user.email});
    console.log(note);
    if(!note){
        let oldNote = await Notes.findById(id);
        if(!oldNote){
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }
        oldNote = await Notes.find({email:req.user.email});
        return res.status(404).json({
            success: false,
            message: 'You are not allowed to update this note',
        });
    }
    if(text.length < 6){
        return res.status(400).json({
            success: false,
            message: 'Text must be 6 characters or more',
        });
    }
    const updatedNote = await Notes.findByIdAndUpdate(id,{text:text},{new:true});
    return res.status(200).json({
      success:true, updatedNote
    })
}

export const todoNotes = async(req,res)=>{
    const {id} = req.params;
    const note = await Notes.findOne({_id:id,email:req.user.email});
    console.log(note);
    if(!note){
        let oldNote = await Notes.findById(id);
        if(!oldNote){
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }
        oldNote = await Notes.find({email:req.user.email});
        return res.status(404).json({
            success: false,
            message: 'You are not allowed to update this note',
        });
    }
    const updatedNote = await Notes.findByIdAndUpdate(id,{todo:((note.todo)?false:true)},{new:true});
    return res.status(200).json({
      success:true, updatedNote
    })
}

export const searchNotes = async(req,res)=>{
    const {searchText} = req.body;
    const email = req.user.email;
    const notes = await Notes.find({email:email,text:{$regex:searchText,$options:'i'}}).sort({_id:-1});
    res.status(200).json({success: true, result: notes});
}