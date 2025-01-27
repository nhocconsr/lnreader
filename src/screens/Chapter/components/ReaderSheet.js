import React, { useCallback, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Pressable,
    ScrollView,
    useWindowDimensions,
    Animated,
} from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Slider from "@react-native-community/slider";
import { IconButton, Menu, Switch } from "react-native-paper";
import Bottomsheet from "rn-sliding-up-panel";

import BottomSheetHandle from "../../../components/BottomSheetHandle";
import { Row } from "../../../components/Common";

import { fonts } from "../../../services/utils/constants";

import {
    setAppSettings,
    setReaderSettings,
} from "../../../redux/settings/settings.actions";
import {
    ToggleButton,
    ToggleColorButton,
} from "../../../components/Common/ToggleButton";

const ReaderSettingTitle = ({ title }) => (
    <Text style={styles.title}>{title}</Text>
);

const ReaderSheet = ({
    theme,
    reader,
    dispatch,
    navigation,
    bottomSheetRef,
    selectText,
    useWebViewForChapter,
    showScrollPercentage,
}) => {
    const [animatedValue] = useState(new Animated.Value(0));

    const [fontMenu, setFontMenu] = useState(false);
    const openFontMenu = () => setFontMenu(true);
    const closeFontMenu = () => setFontMenu(false);

    const presetThemes = [
        { value: 2, backgroundColor: "#f5f5fa", textColor: "#111111" },
        { value: 3, backgroundColor: "#F7DFC6", textColor: "#593100" },
        { value: 6, backgroundColor: "#dce5e2", textColor: "#000000" },
        { value: 4, backgroundColor: "#292832", textColor: "#CCCCCC" },
        {
            value: 1,
            backgroundColor: "#000000",
            textColor: "rgba(255,255,255,0.7)",
        },
    ];

    const textAlignments = [
        { value: "left", icon: "format-align-left" },
        { value: "center", icon: "format-align-center" },
        { value: "justify", icon: "format-align-justify" },
        { value: "right", icon: "format-align-right" },
    ];

    const FirstRoute = useCallback(
        () => (
            <View style={{ flex: 1, paddingVertical: 16 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: theme.textColorSecondary,
                            paddingHorizontal: 16,
                            textAlign: "center",
                        }}
                    >
                        Text size
                    </Text>
                    <Slider
                        style={{
                            flex: 1,
                            height: 40,
                        }}
                        value={reader.textSize}
                        minimumValue={12}
                        maximumValue={20}
                        step={1}
                        minimumTrackTintColor={theme.colorAccent}
                        maximumTrackTintColor="#000000"
                        thumbTintColor={theme.colorAccent}
                        onSlidingComplete={(value) =>
                            dispatch(setReaderSettings("textSize", value))
                        }
                    />
                </View>

                <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                    <Row
                        style={{
                            justifyContent: "space-between",
                            marginVertical: 6,
                        }}
                    >
                        <Text style={{ color: theme.textColorSecondary }}>
                            Color
                        </Text>
                        <View style={{ marginLeft: 16 }}>
                            <ScrollView horizontal={true}>
                                {presetThemes.map((item, index) => (
                                    <ToggleColorButton
                                        key={index}
                                        selected={reader.theme === item.value}
                                        backgroundColor={item.backgroundColor}
                                        textColor={item.textColor}
                                        theme={theme}
                                        onPress={() => {
                                            dispatch(
                                                setReaderSettings(
                                                    "theme",
                                                    item.value
                                                )
                                            );
                                            dispatch(
                                                setReaderSettings(
                                                    "textColor",
                                                    item.textColor
                                                )
                                            );
                                        }}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "space-between",
                            marginVertical: 6,
                        }}
                    >
                        <Text style={{ color: theme.textColorSecondary }}>
                            Text align
                        </Text>
                        <Row>
                            {textAlignments.map((item) => (
                                <ToggleButton
                                    key={item.value}
                                    selected={item.value === reader.textAlign}
                                    icon={item.icon}
                                    theme={theme}
                                    onPress={() =>
                                        dispatch(
                                            setReaderSettings(
                                                "textAlign",
                                                item.value
                                            )
                                        )
                                    }
                                />
                            ))}
                        </Row>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "space-between",
                            marginVertical: 6,
                        }}
                    >
                        <Text style={{ color: theme.textColorSecondary }}>
                            Padding
                        </Text>
                        <Row>
                            <IconButton
                                icon="minus"
                                color={theme.colorAccent}
                                size={26}
                                disabled={reader.padding <= 0 ? true : false}
                                onPress={() =>
                                    dispatch(
                                        setReaderSettings(
                                            "padding",
                                            reader.padding - 1
                                        )
                                    )
                                }
                                style={{ marginVertical: 0 }}
                            />
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    paddingHorizontal: 24,
                                }}
                            >
                                {`${reader.padding}%`}
                            </Text>
                            <IconButton
                                icon="plus"
                                color={theme.colorAccent}
                                size={26}
                                disabled={reader.padding >= 10 ? true : false}
                                onPress={() =>
                                    dispatch(
                                        setReaderSettings(
                                            "padding",
                                            reader.padding + 1
                                        )
                                    )
                                }
                                style={{ marginVertical: 0 }}
                            />
                        </Row>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "space-between",
                            marginVertical: 6,
                        }}
                    >
                        <Text style={{ color: theme.textColorSecondary }}>
                            Line height
                        </Text>
                        <Row>
                            <IconButton
                                icon="minus"
                                color={theme.colorAccent}
                                size={26}
                                disabled={
                                    reader.lineHeight <= 1.3 ? true : false
                                }
                                onPress={() =>
                                    dispatch(
                                        setReaderSettings(
                                            "lineHeight",
                                            reader.lineHeight - 0.1
                                        )
                                    )
                                }
                                style={{ marginVertical: 0 }}
                            />
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    paddingHorizontal: 24,
                                }}
                            >
                                {`${Math.round(reader.lineHeight * 10) / 10}%`}
                            </Text>
                            <IconButton
                                icon="plus"
                                color={theme.colorAccent}
                                size={26}
                                disabled={reader.lineHeight >= 2 ? true : false}
                                onPress={() =>
                                    dispatch(
                                        setReaderSettings(
                                            "lineHeight",
                                            reader.lineHeight + 0.1
                                        )
                                    )
                                }
                                style={{ marginVertical: 0 }}
                            />
                        </Row>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "space-between",
                            marginVertical: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.textColorSecondary,
                                marginRight: 16,
                            }}
                        >
                            Font style
                        </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: "center" }}
                        >
                            {fonts.map((font) => (
                                <View
                                    style={[
                                        {
                                            borderRadius: 8,
                                            overflow: "hidden",
                                            marginHorizontal: 6,
                                        },
                                        reader.fontFamily ===
                                            font.fontFamily && {
                                            backgroundColor: theme.rippleColor,
                                        },
                                    ]}
                                >
                                    <Pressable
                                        style={{
                                            borderRadius: 8,
                                            paddingHorizontal: 10,
                                            paddingVertical: 4,
                                        }}
                                        onPress={() =>
                                            dispatch(
                                                setReaderSettings(
                                                    "fontFamily",
                                                    font.fontFamily
                                                )
                                            )
                                        }
                                        android_ripple={{
                                            color: theme.rippleColor,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: font.fontFamily,
                                                color:
                                                    reader.fontFamily ===
                                                    font.fontFamily
                                                        ? theme.colorAccent
                                                        : theme.textColorPrimary,
                                            }}
                                        >
                                            {font.name}
                                        </Text>
                                    </Pressable>
                                </View>
                            ))}
                        </ScrollView>
                    </Row>
                </View>
            </View>
        ),
        [reader]
    );

    const SecondRoute = useCallback(
        () => (
            <View style={{ flex: 1 }}>
                <Pressable
                    style={styles.switchStyle}
                    android_ripple={{ color: theme.rippleColor }}
                    onPress={() =>
                        dispatch(
                            setAppSettings(
                                "useWebViewForChapter",
                                !useWebViewForChapter
                            )
                        )
                    }
                >
                    <Text
                        style={{
                            color: theme.textColorSecondary,
                        }}
                    >
                        Use WebView
                    </Text>
                    <Switch
                        value={useWebViewForChapter}
                        onValueChange={() =>
                            dispatch(
                                setAppSettings(
                                    "useWebViewForChapter",
                                    !useWebViewForChapter
                                )
                            )
                        }
                        color={theme.colorAccent}
                    />
                </Pressable>
                <Pressable
                    style={styles.switchStyle}
                    android_ripple={{ color: theme.rippleColor }}
                    onPress={() =>
                        dispatch(
                            setAppSettings(
                                "showScrollPercentage",
                                !showScrollPercentage
                            )
                        )
                    }
                >
                    <Text
                        style={{
                            color: theme.textColorSecondary,
                        }}
                    >
                        Show progress percentage
                    </Text>
                    <Switch
                        value={showScrollPercentage}
                        onValueChange={() =>
                            dispatch(
                                setAppSettings(
                                    "showScrollPercentage",
                                    !showScrollPercentage
                                )
                            )
                        }
                        color={theme.colorAccent}
                    />
                </Pressable>
                {!useWebViewForChapter && (
                    <Pressable
                        style={styles.switchStyle}
                        android_ripple={{ color: theme.rippleColor }}
                        onPress={() =>
                            dispatch(
                                setAppSettings("textSelectable", !selectText)
                            )
                        }
                    >
                        <Text
                            style={{
                                color: theme.textColorSecondary,
                            }}
                        >
                            Select text
                        </Text>
                        <Switch
                            value={selectText}
                            onValueChange={() =>
                                dispatch(
                                    setAppSettings(
                                        "textSelectable",
                                        !selectText
                                    )
                                )
                            }
                            color={theme.colorAccent}
                        />
                    </Pressable>
                )}
            </View>
        ),
        [useWebViewForChapter, selectText, showScrollPercentage]
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "Display" },
        { key: "second", title: "General" },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.colorAccent }}
            style={{ backgroundColor: theme.colorPrimary }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color }}>{route.title}</Text>
            )}
            inactiveColor={theme.textColorSecondary}
            activeColor={theme.colorAccent}
            pressColor={theme.rippleColor}
        />
    );

    return (
        <Bottomsheet
            animatedValue={animatedValue}
            ref={bottomSheetRef}
            draggableRange={{ top: 400, bottom: 0 }}
            snappingPoints={[0, 400]}
            showBackdrop={true}
            backdropOpacity={0}
        >
            <View
                style={[
                    styles.contentContainer,
                    { backgroundColor: theme.colorPrimaryDark },
                ]}
            >
                <TabView
                    navigationState={{ index, routes }}
                    renderTabBar={renderTabBar}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
                />
            </View>
        </Bottomsheet>
    );
};

export default ReaderSheet;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    readerSettingsContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    switchStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});
