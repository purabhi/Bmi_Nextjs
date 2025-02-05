
import mongoose, { Schema } from "mongoose";

const BmiSchema = new Schema(
    {
        Name :{
            type:String,
            default:""
        },

        Email:{
            type:String,
            required:false,
            default:""
        },

        Pass: {
            type: String, 
            required: false,
            default:""
        },

        

        bmi:[
            {
                Weight: {
                    type: Number,
                    required: false,
                    default:0
                },
        
                Height: {
                    type: Number,
                    required: false,
                    default:0
                },
        
                Age: {
                    type: Number,
                    required: false,
                    default:0
                },
               
                Gender: {
                    type: String,
                    required: false,
                    default:""
                },
                date:{
                    type:Date
                    
                },
                bmiValue:{
                    type:Number,
                    default:0
                }
            }
        ],

        friend :[
            {
                Fname :{
                    type:String,
                    required:false,
                    default:""
                },
        
                Femail:{
                    type:String,
                    required:false,
                    default:""
                },
        
                Fbmi:[
                    {

                        Fheight: {
                            type: Number,
                            required: false,
                            default:0
                        },
                
                        Fage: {
                            type: Number,
                            required: false,
                            default:0
                        },

                        Fweight: {
                            type: Number,
                            required: false,
                            default:0
                        },
                       
                        Fgender: {
                            type: String,
                            required: false,
                            default:""
                        },

                        date:{
                            type:Date
                            
                        },
                        FbmiValue:{
                            type:Number,
                            default:0
                        }
                    }
                ],  
            }
        ]
        
    }, {
    timestamps: true
}
)


const bmiTable = mongoose.models.bmiTable || mongoose.model("bmiTable", BmiSchema)

export default bmiTable


