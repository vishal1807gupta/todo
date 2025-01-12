import tasks from '../models/tasks.js';

export const addtask = async (req, res) => {
    const { text } = req.body;
    if (text.length < 6){
      return res.status(400).json({
        success: false,
        message: 'Text must be 6 characters or more',
      });
    }
    const {email} = req.user;
    const task = await tasks.create({
      text: text,
      email: email,
      todo: false,
    });
    const { _id: id} = task;
    res.status(201).json({
      success: true,
      result: { id, text, email},
    });
};

export const deletetask = async(req,res)=>{
  const {id} = req.params;
  const task = await tasks.findOne({_id:id,email:req.user.email});
  if(!task){
      let oldtask = await tasks.findById(id);
      if(!oldtask){
          return res.status(404).json({
              success: false,
              message: 'task not found',
          });
      }
      oldtask = await tasks.find({email:req.user.email});
      return res.status(404).json({
          success: false,
          message: 'You are not allowed to delete this task',
      });
  }
    const deletedtask = await tasks.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        result: deletedtask,
    });
}

export const gettasks = async(req,res)=>{
    const email = req.user.email;
    const task = await tasks.find({email:email}).sort({_id:-1});
    res.status(200).json({success: true, result: task});
}

export const updatetasks = async(req,res)=>{
    const {id} = req.params;
    const {text} = req.body;
    const task = await tasks.findOne({_id:id,email:req.user.email});
    if(!task){
        let oldtask = await tasks.findById(id);
        if(!oldtask){
            return res.status(404).json({
                success: false,
                message: 'task not found',
            });
        }
        oldtask = await tasks.find({email:req.user.email});
        return res.status(404).json({
            success: false,
            message: 'You are not allowed to update this task',
        });
    }
    if(text.length < 6){
        return res.status(400).json({
            success: false,
            message: 'Text must be 6 characters or more',
        });
    }
    const updatedtask = await tasks.findByIdAndUpdate(id,{text:text},{new:true});
    return res.status(200).json({
      success:true, updatedtask
    })
}

export const todotasks = async(req,res)=>{
    const {id} = req.params;
    const task = await tasks.findOne({_id:id,email:req.user.email});
    if(!task){
        let oldtask = await tasks.findById(id);
        if(!oldtask){
            return res.status(404).json({
                success: false,
                message: 'task not found',
            });
        }
        oldtask = await tasks.find({email:req.user.email});
        return res.status(404).json({
            success: false,
            message: 'You are not allowed to update this task',
        });
    }
    const updatedtask = await tasks.findByIdAndUpdate(id,{todo:((task.todo)?false:true)},{new:true});
    return res.status(200).json({
      success:true, updatedtask
    })
}

export const searchtasks = async(req,res)=>{
    const {searchText} = req.body;
    const email = req.user.email;
    const task = await tasks.find({email:email,text:{$regex:searchText,$options:'i'}}).sort({_id:-1});
    res.status(200).json({success: true, result: task});
}