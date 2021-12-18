import {useState} from "react";
import {Container} from "react-bootstrap";
import {CustomAlertType} from "../../types/CustomAlertType";
import {AddressType} from "../../types/PostalCodeSearch";
import CustomAlert from "./CustomAlert";
import PostalCodeSearchForm from "./PostalCodeSearchForm";
import PostalCodeSearchTable from "./PostalCodeSearchTable";

const PostalCodeSearch: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postalCode, setPostalCode] = useState<string>('');
  const [address, setAddress] = useState<AddressType[]>([]);
  const [alert, setAlert] = useState<CustomAlertType>({
    variant: 'info',
    message: '',
    show: false,
  });


  return (
    <Container className="p-4">
      <CustomAlert customAlert={alert} setAlert={setAlert} />
      <PostalCodeSearchForm postalCode={postalCode} setPostalCode={setPostalCode} loading={loading} alert={alert} setLoading={setLoading} setAlert={setAlert} setAddress={setAddress}
      />
      <PostalCodeSearchTable address={address} />
    </Container>
  );
};

export default PostalCodeSearch;
