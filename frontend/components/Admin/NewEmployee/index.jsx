import { Button, Card, Form, Input, message, Table } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { trimData, http } from "../../../modules/modules";
import swal from "sweetalert";
import {useState} from "react";

const {Item} = Form;
const NewEmployee = () => {
    // states collection
    const [empForm] = Form.useForm();
    const [messageApi, context] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(false);

    // create new employee
    const onFinish = async (values) => {

        try{
            setLoading(true);
            let finalObj= trimData(values);
            finalObj.profile = photo ? photo : "bankImages/luffy.png";
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
          src={profile}
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
    render: () => (
        <div className="flex gap-1">
            <Button
            type="text"
            className="!bg-pink-100 !text-pink-500"
            icon={<EyeInvisibleOutlined />}
            />
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
                >
                   <Table
  columns={columns}
  dataSource={[{}, {}]}
  rowKey={(record, index) => index}
/>
                </Card>
            </div>
        </Adminlayout>
    )
}

export default NewEmployee;