import {Dispatch, useCallback, useMemo, useState} from "react";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {getPostalCode} from "../../api/PostalCode/PostalCode";
import {CustomAlertType} from "../../types/CustomAlertType";
import {AddressType} from "../../types/PostalCodeSearch";


interface Props {
  postalCode: string,
  setPostalCode: Dispatch<string>,
  loading: boolean,
  alert: CustomAlertType,
  setLoading: Dispatch<boolean>,
  setAlert: Dispatch<CustomAlertType>,
  setAddress: Dispatch<AddressType[]>,
}

const regex = /^[0-9]{3}[0-9]{4}$/;

const PostalCodeSearchForm: React.FC<Props> = ({postalCode, setPostalCode, loading, setLoading, setAlert, setAddress}) => {

  const [isInvalid, setIsInvalid] = useState<boolean>(true);


  const addressFetch = useCallback(
    async () => {
      setLoading(true);
      getPostalCode(postalCode).then(jsonResponse => {
        if (!jsonResponse.results && (jsonResponse.status === 400 || jsonResponse.status === 500)) {
          setAlert(
            {
              variant: 'danger',
              message: jsonResponse.message,
              show: true,
            }
          )
          return;
        }
        if (jsonResponse.status === 200 && !jsonResponse.results) {
          setAlert(
            {
              variant: 'danger',
              message: '0件です',
              show: true,
            }
          )
          return;
        }
        setAddress(jsonResponse.results);
        return;
      }).catch((error) => {
        setAlert(
          {
            variant: 'danger',
            message: String(error),
            show: true,
          }
        )
      }).finally(() => {
        setLoading(false);
        return;
      });
    }, [postalCode, setAddress, setAlert, setLoading])

  const handleSearchInputChanges = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostalCode(e.target.value);
    }, [setPostalCode]);

  const handleSubmit = useCallback(async () => {
    const validationResult = regex.test(postalCode);
    setIsInvalid(validationResult);
    if (validationResult) {
      await addressFetch();
    }
  }, [addressFetch, postalCode]);



  const form = useMemo(() => (
    <div className="PostalCodeSearch">
      <p style={{color: 'red', display: isInvalid ? 'none' : 'block'}}>郵便番号が不正です。ハイフンなしの7桁で入力してください</p>
      <Form>
        <Row>
          <Col sm={11}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control placeholder="郵便番号を入力してください" value={postalCode} onChange={handleSearchInputChanges} />
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Button variant='primary' type="button"
              style={{cursor: isInvalid ? 'pointer' : 'not-allowed'}}
              disabled={loading} onClick={async () => await handleSubmit()}>
              {loading ? <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true" /> : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  ), [postalCode, handleSearchInputChanges, isInvalid, loading, handleSubmit])

  return form;
};

export default PostalCodeSearchForm;