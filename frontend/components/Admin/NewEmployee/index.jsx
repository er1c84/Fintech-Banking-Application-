import { Button, Card, Form, Input, message, Popconfirm, Table } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { trimData, http } from "../../../modules/modules";
import swal from "sweetalert";
import {useState, useEffect} from "react";


const {Item} = Form;
const NewEmployee = () => {
    // states collection
    const [empForm] = Form.useForm();
    const [messageApi, context] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [allEmployees, setAllEmployee] = useState([]);
    const [no, setNo] = useState(0);

    //get all employee data
    useEffect(() => {
        const fetcher = async () => {
            try{
                const httpReq = http();
                const {data} = await httpReq.get("/api/users");
                setAllEmployee(data.data);
            }catch(err){
                messageApi.error("Unable to fetch data!");
            }
        }
        fetcher();

    }, [no]);

    // create new employee
    const onFinish = async (values) => {

        try{
            setLoading(true);
            let finalObj= trimData(values);
            finalObj.profile = photo ? photo : "bankImages/luffy.png";
            finalObj.key = finalObj.email;
            const httpReq = http();
            const{data} = await httpReq.post("/api/users",finalObj);

            const obj = {
                email: finalObj.email,
                password: finalObj.password
            }

            const res = await httpReq.post("/api/send-email",obj);
            console.log(res);

            messageApi.success("Employee Created Successfully");
            empForm.resetFields();
            setPhoto(null);
            setNo(no+1);
        }
        catch(err){
            if(err?.response?.data?.error?.code ==11000){
                empForm.setFields([
                    {
                        name: "email",
                        errors: ["Email already exists"],
                    },
                ]);
                    }
            else{
                messageApi.error("Try again later");
        }
        }finally{
            setLoading(false);
        }
    }

    // update isActive
    const updateIsActive = async (id, isActive) =>{
        try{
            const obj = {
                isActive: !isActive
            }
            const httpReq = http();
            await httpReq.put(`/api/users/${id}`, obj);
            messageApi.success("Record updated successfully!");
            setNo(no+1);
            
        }catch(err){
            messageApi.error("Unable to update isActive!");
        }
    }
    //handles file upload
    const handleUpload = async (e) => {
       try{
            let file = e.target.files[0];
            const formData = new FormData();
            formData.append("photo", file);
            const httpReq = http();
            const {data} = await httpReq.post("/api/upload", formData);
            setPhoto(data.filePath);

       }catch(err){
            console.log("STATUS:", err?.response?.status);
            console.log("DATA:", err?.response?.data);
            console.log("MSG:", err?.message);
            messageApi.error("Image upload failed");
       }
    }

    // Table Columns
    const colums = []
    const columns = [
  {
    title: "Profile",
    dataIndex: "profile",
    key: "profile",
    render: (profile) =>
      profile ? (
        <img
          src={`${import.meta.env.VITE_BASEURL}/${profile}`}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <span>No Image</span>
      ),
  },
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    fixed : "right",
    render: (_, obj) => (
        <div className="flex gap-1">
            <Popconfirm
            title={"Are you sure?"}
            description="Once you update, you can also re-update!"
            onCancel={() => messageApi.info("No changes occur!")}
            onConfirm={() => updateIsActive(obj._id, obj.isActive)} 
            >
                <Button
                type="text"
                className={`${obj.isActive ? "!bg-indigo-300 !text-white" : "!bg-pink-100 !text-pink-500"}`}
                icon={obj.isActive ? <EyeOutlined/> : <EyeInvisibleOutlined/>} 
            />
            </Popconfirm>
            <Button
            type="text"
            className="!bg-pink-100 !text-pink-500"
            icon={<EditOutlined />}
            />
            <Button
            type="text"
            className="!bg-pink-100 !text-pink-500"
            icon={<DeleteOutlined />}
            />

        </div>
    )
  }
];
    return (
        <Adminlayout>
        {context}
            <div className="grid md:grid-cols-3 gap-3">
                <Card
                title="New Employees"
                >
                    <Form 
                    form={empForm}
                    onFinish={onFinish}
                    layout="vertical">
                        <Item
                        label="Profile"
                        name="xyz"
                        >
                            <Input onChange = {handleUpload} type= "file"/>
                        </Item>
                        <div className="grid md:grid-cols-2 gap-x-2">
                                                    
                        <Item
                        name="email"
                        label="Email"
                        rules={[{required:true}]}
                        >
                            <Input />
                        </Item>
                        <Item
                        name="password"
                        label="password"
                        rules={[{required:true}]}
                        >
                            <Input/>
                        </Item>
                        <Item
                        name="fullname"
                        label="Fullname"
                        rules={[{required:true}]}
                        >
                            <Input />
                        </Item>
                        <Item
                        name="mobile"
                        label="Mobile"
                        rules={[{required:true}]}
                        >
                            <Input type="number"/>
                        </Item>
                        </div>
                        <Item
                        label= "Address"
                        name="address"
                        >
                            <Input.TextArea />
                        </Item>
                        <Item>
                            <Button
                            loading={loading}
                            type="text"
                            htmlType="submit"
                            className="!bg-blue-400 !text-white !font-bold !w-full">
                            Submit

                            </Button>
                        </Item>
                    </Form>
                </Card>
                <Card
                className="md:col-span-2" 
                title="List Employees"
                style={{overflowX: "auto"}}
                >
                <Table
                    columns={columns}
                    dataSource={allEmployees}
                    scroll={{ x: "max-content" }}
                />
                </Card>
            </div>
        </Adminlayout>
    )
}

export default NewEmployee;