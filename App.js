import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MenuList from "./SectionList";
import { palette } from "./palette";

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loginData, setloginData] = useState({
    email: null,
    password: null,
  });

  const _onChange = (type) => (text) => {
    switch (type) {
      case "EMAIL":
        setloginData((prevState) => {
          return {
            ...prevState,
            email: text,
          };
        });
        break;

      case "PASSWORD":
        setloginData((prevState) => {
          return {
            ...prevState,
            password: text,
          };
        });
        break;

      default:
        break;
    }
  };

  const _onGoBack = () => {
    setClicked((prevState) => !prevState);
  };

  const _onPress = () => {
    setisLoading(true);
    setTimeout(() => {
      setClicked((prevState) => !prevState);
      setisLoading(false);
    }, 3000);
  };

  const isLoginDisable = !loginData.email && !loginData.password;

  return (
    <View style={styles.container}>
      {!clicked && (
        <View style={styles.flex}>
          <Text style={styles.text}>Please Enter Your Email</Text>
          <TextInput
            testID={"email"}
            style={styles.input}
            onChangeText={_onChange("EMAIL")}
            value={loginData.email}
            placeholder="Email"
            keyboardType={"email-address"}
          />
          <Text style={styles.text} accessibilityLabel="password-label">
            Please Enter Your Password
          </Text>

          <TextInput
            testID={"password"}
            style={styles.input}
            onChangeText={_onChange("PASSWORD")}
            value={loginData.password}
            placeholder="Password"
            keyboardType="visible-password"
          />

          <Pressable
            testID="login-button"
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? palette.primary : palette.secondary,
              },
              styles.button,
              isLoginDisable && styles.disableButtonStyle,
            ]}
            disabled={isLoginDisable}
            onPress={_onPress}
          >
            {isLoading ? (
              <ActivityIndicator color={palette.white} size={"small"} />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </Pressable>
        </View>
      )}
      {clicked && (
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.mainContainer}>
            <Text style={styles.hi}>Welcome back</Text>
            <MenuList />
            {/* <Pressable
            testID="go-back-button"
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? palette.primary : palette.secondary,
              },
              styles.button,
            ]}
            onPress={_onGoBack}
          >
            <Text style={styles.loginText}>Go Back</Text>
          </Pressable> */}
          </View>
        </SafeAreaView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  hi: {
    fontSize: 30,
    color: palette.secondary,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#222222",
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginVertical: 16,
    borderWidth: 1,
    padding: 10,
    borderColor: palette.borderColor,
  },
  disableButtonStyle: {
    backgroundColor: palette.disableColor,
  },
});
