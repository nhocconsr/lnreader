import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const ChapterFooter = ({
    hide,
    theme,
    swipeGestures,
    readerSheetRef,
    scrollViewRef,
    navigateToNextChapter,
    navigateToPrevChapter,
    nextChapter,
    prevChapter,
    useWebViewForChapter,
    enableSwipeGestures,
    enableWebView,
}) => {
    const rippleConfig = {
        color: theme.rippleColor,
        borderless: true,
        radius: 50,
    };

    if (hide) {
        return null;
    } else {
        return (
            <View
                style={{
                    position: "absolute",
                    zIndex: 2,
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    flexDirection: "row",
                }}
            >
                <Pressable
                    android_ripple={rippleConfig}
                    style={styles.buttonStyles}
                    onPress={navigateToPrevChapter}
                >
                    <IconButton
                        icon="chevron-left"
                        size={26}
                        disabled={!prevChapter}
                        color="#FFFFFF"
                    />
                </Pressable>
                <Pressable
                    android_ripple={rippleConfig}
                    style={styles.buttonStyles}
                    onPress={enableSwipeGestures}
                >
                    <IconButton
                        icon="gesture-swipe"
                        disabled={!swipeGestures}
                        size={26}
                        color="#FFFFFF"
                    />
                </Pressable>
                {!useWebViewForChapter && (
                    <Pressable
                        android_ripple={rippleConfig}
                        style={styles.buttonStyles}
                        onPress={() => scrollViewRef.current.scrollTo({})}
                    >
                        <IconButton
                            icon="format-vertical-align-top"
                            size={26}
                            color="#FFFFFF"
                        />
                    </Pressable>
                )}
                {/* <Pressable
                    android_ripple={rippleConfig}
                    style={styles.buttonStyles}
                    onPress={enableWebView}
                >
                    <IconButton
                        icon="language-html5"
                        disabled={!useWebViewForChapter}
                        size={26}
                        color="#FFFFFF"
                    />
                </Pressable> */}
                <Pressable
                    android_ripple={rippleConfig}
                    style={styles.buttonStyles}
                    onPress={() => readerSheetRef.current.show()}
                >
                    <IconButton icon="cog-outline" size={26} color="#FFFFFF" />
                </Pressable>
                <Pressable
                    android_ripple={rippleConfig}
                    style={styles.buttonStyles}
                    onPress={navigateToNextChapter}
                >
                    <IconButton
                        icon="chevron-right"
                        size={26}
                        disabled={!nextChapter}
                        color="#FFFFFF"
                    />
                </Pressable>
            </View>
        );
    }
};

export default ChapterFooter;

const styles = StyleSheet.create({
    buttonStyles: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
});
