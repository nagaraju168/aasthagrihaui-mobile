import { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Alert, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Web() {
    const webViewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const uri = `http://192.168.100.103:4200/login`;
    const whiltListUrls = [`http://192.168.100.103:4200`];
    

    const handleBackPress = () => {
        console.log(window.current)
        webViewRef.current.goBack();
        return false;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove(); // Cleanup the event listener
    }, [canGoBack]);

    return (
        <WebView
            style={styles.container}
            source={{ uri }}
            originWhitelist={whiltListUrls}
            ref={webViewRef}
            scalesPageToFit={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            bounces={false}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            cacheEnabled={true}
            saveFormDataDisabled={false}
            androidLayerType="hardware" />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
