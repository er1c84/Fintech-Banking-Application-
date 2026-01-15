import { Button, Card, Form, Input, Table } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { trimData } from "../../../modules/modules";
import axios from "axios";


const {Item} = Form;
const NewEmployee = () => {
    // states collection
    const[empForm] = Form.useForm();

    // creat enew employee
    const onFinish = async (values) => {
        try{

            let finalObj= trimData(values);
            const{data} = await axios.post("http://localhost:8090/api/users",finalObj);
            console.log(data);
        }
        catch(err){
            console.log(err);
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
                            <Input type="file"/>
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