import {useEffect} from 'react';

const E404 = () => {
    useEffect(() => {
        window.location.replace("/");
        // eslint-disable-next-line
    }, []);
    return (
        null
    )
}
 
E404.getInitialProps = async () => ({
    namespacesRequired: [],
});

export default E404;