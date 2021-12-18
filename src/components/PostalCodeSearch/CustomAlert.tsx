import {Dispatch, useCallback, useEffect, useMemo} from "react";
import {Alert} from "react-bootstrap";
import {CustomAlertType} from "../../types/CustomAlertType";


interface Props {
  customAlert: CustomAlertType,
  setAlert: Dispatch<CustomAlertType>
}

const CustomAlert: React.FC<Props> = ({customAlert, setAlert}) => {
  const sleep = useCallback(async (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000)), []);
  const reset = useCallback(async () => {
    sleep(3).then(() => {
      setAlert(
        {
          variant: 'info',
          message: '',
          show: false
        }
      );
    });
  }, [setAlert, sleep]);

  useEffect(() => {
    return () => {
      if (!customAlert.show) reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customAlert.show])

  const alert = useMemo(() => {
    return (
      <Alert variant={customAlert.variant} show={customAlert.show}>
        {customAlert.message}
      </Alert>
    );
  }, [customAlert])
  return alert;
};

export default CustomAlert;
