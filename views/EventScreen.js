import React from "react";
import AppLoading from "expo-app-loading";
import {
    Text,
    StyleSheet,
    Pressable,
    View,
} from "react-native";
import {
    useFonts,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

export default function EventScreen({navigation, route}) {

    let [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_400Regular,
        OpenSans_600SemiBold,
        OpenSans_700Bold,
    });

    const {data} = route.params;

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={() => {
                    navigation.navigate('EventScreen');
                }}>
                    <View style={styles.content}>
                        <View style={styles.textcontent}>
                            <Text style={styles.header}>
                                {data.title}
                            </Text>
                            <Text style={styles.text}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry.
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    button: {
        width: 380,
        backgroundColor: "#FFF",
        margin: "2%",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 25,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    content: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    imageContainer: {
        width: "100%",
        flex: 2,
        height: "20%",
        borderTopRightRadius: 25,
        overflow: "hidden",
        borderTopLeftRadius: 25,
    },
    textcontent: {
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    header: {
        color: "#112454",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "5%",
        fontSize: 16,
        fontFamily: "OpenSans_600SemiBold",
    },
    text: {
        display: "flex",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
        paddingBottom: "2%",
        fontFamily: "OpenSans_400Regular",
        fontSize: 14,
        color: "#727aa3",
    },
    containerButton: {
        display: "flex",
        width: "100%",
        padding: "2%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        borderRadius: 25,
    },
    buttonContent: {
        padding: "3%",
        backgroundColor: "#fff",
        shadowColor: "#888",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        borderRadius: 25,
    },
});