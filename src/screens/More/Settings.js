import React from "react";
import { View } from "react-native";

import { Appbar } from "../../components/Appbar";
import { List } from "../../components/List";

import { useTheme } from "../../hooks/reduxHooks";

const SettingsScreen = ({ navigation }) => {
    const theme = useTheme();

    return (
        <>
            <Appbar title="Settings" onBackAction={navigation.goBack} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.colorPrimaryDark,
                }}
            >
                <List.Item
                    title="General"
                    icon="tune"
                    onPress={() =>
                        navigation.navigate("SettingsStack", {
                            screen: "GeneralSettings",
                        })
                    }
                    theme={theme}
                />
                <List.Item
                    title="Reader"
                    icon="book-open-outline"
                    onPress={() =>
                        navigation.navigate("SettingsStack", {
                            screen: "ReaderSettings",
                        })
                    }
                    theme={theme}
                />
                <List.Item
                    title="Tracking"
                    icon="sync"
                    onPress={() =>
                        navigation.navigate("SettingsStack", {
                            screen: "TrackerSettings",
                        })
                    }
                    theme={theme}
                />
                <List.Item
                    title="Backup"
                    icon="cloud-upload-outline"
                    onPress={() =>
                        navigation.navigate("SettingsStack", {
                            screen: "BackupSettings",
                        })
                    }
                    theme={theme}
                />
                <List.Item
                    title="Advanced"
                    icon="code-tags"
                    onPress={() =>
                        navigation.navigate("SettingsStack", {
                            screen: "AdvancedSettings",
                        })
                    }
                    theme={theme}
                />
            </View>
        </>
    );
};

export default SettingsScreen;
