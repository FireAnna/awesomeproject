import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "../styles/styles";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ keyboardHide, isKeyboardOpen, setIsKeyboardOpen }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [secureEntry, setSecureEntry] = useState(true);
  const [inFocus, setInFocus] = useState("");

  const togglePass = () => {
    setSecureEntry(!secureEntry);
  };

  const onSignIn = (e) => {
    e.preventDefault();
    console.log(loginState);
    setLoginState(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View
        style={{
          ...styles.containerLogin,
          marginBottom: isKeyboardOpen ? -100 : 0,
        }}
      >
        <Text style={styles.title}>Войти</Text>

        <TextInput
          placeholder="Адрес электронной почты"
          style={{
            ...styles.input,
            borderColor: inFocus === "email" ? "#ff6c00" : "#E8E8E8",
          }}
          value={loginState.email}
          onChangeText={(value) =>
            setLoginState((prev) => ({ ...prev, email: value }))
          }
          onFocus={() => {
            setIsKeyboardOpen(true);
            setInFocus("email");
          }}
          onBlur={() => {
            setIsKeyboardOpen(false);
            setInFocus("");
          }}
        />
        <View>
          <TextInput
            placeholder="Пароль"
            style={[
              styles.input,
              {
                ...styles.lastInput,
                marginBottom: isKeyboardOpen ? 32 : 43,
                borderColor: inFocus === "password" ? "#ff6c00" : "#E8E8E8",
              },
            ]}
            value={loginState.password}
            secureTextEntry={secureEntry}
            onChangeText={(value) =>
              setLoginState((prev) => ({ ...prev, password: value }))
            }
            onFocus={() => {
              setIsKeyboardOpen(true);
              setInFocus("password");
            }}
            onBlur={() => {
              setIsKeyboardOpen(false);
              setInFocus("");
            }}
          />
          <Text style={styles.showPassLogin} onPress={togglePass}>
            Показать
          </Text>
        </View>
        {!isKeyboardOpen && (
          <>
            <TouchableOpacity style={styles.buttonMain} onPress={onSignIn}>
              <Text style={styles.buttonMainText} onPress={keyboardHide}>
                Войти
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
