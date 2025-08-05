import userModel from "../models/user.js"

export const Register=async(req,res)=>{
    try {
        let userInDb=await userModel.findOne({email:req.body.email});
        if(userInDb) {
            return res.status(404).send({message:"user in use"});
            return;
        }
        let userData= await userModel.create({ 
            ...req.body,
            profilePic:req?.file?.filename,
        });
        if(userData) res.status(201).send({message:"user created"});
        else res.status(404).send({message:"unable to create user"});
    } 
    catch (e) {
console.log("fail to submit");
res.status(404).send({error:e?.message});
    }
};

export const login=async(req,res)=>{
    try {
        let userInDb=await userModel.findOne({email:req.body.email,
             password:req.body.password,
        });
        if(userInDb)
            return res.status(200).send({id:userInDb._id,role:userInDb.role});
        else res.status(404).send({message:"wrond pasword "});
    } 
    catch (error) {
console.log("fail to submit");
    }
};



export const ChangePassword= async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        
        if (newPassword !== confirmPassword) {
            return res.status(400).send({ message: "Passwords don't match" });
        }

        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send({ message: "Password changed" });
    } catch (error) {
        res.status(500).send({ message: "Error changing password" });
    }
};

export const EditProfile = async (req, res) => {
    try {
        const { id, name, email } = req.body;
        const updated = await userModel.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );
        res.status(updated ? 200 : 404).send(messgae,"Not found");
    } catch (error) {
        res.status(500).send("Error");
    }
};

