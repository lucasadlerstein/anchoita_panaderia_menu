import {useEffect} from 'react';

const Error = () => {
    useEffect(() => {
        window.location.replace("/");
        // eslint-disable-next-line
    }, []);
    return (
        null
    )
}
 
Error.getInitialProps = async () => ({
    namespacesRequired: [],
});

export default Error;