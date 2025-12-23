import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useThemeCustom } from "../../../theme/ThemeProviderCustom";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../../service/config/ApiConfig";

const forgotPasswordAPI = async ({
  email,
  realm,
}: {
  email: string;
  realm: string;
}) => {



  const response = await fetch(
    `${API_BASE_URL}kc-profile/auth/forgot-password/${realm}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};

export default function ForgotYourPasswordForm() {
  const { theme } = useThemeCustom();
  const navigation = useNavigation();
 const { realm, loading } = useAuthContext();


  console.log("Updated realm:", realm);




  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resending, setResending] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (data) => {
      alert(data?.message || "Reset link sent successfully");
    },
    onError: (error: any) => {
      alert(error?.message || "Something went wrong");
    },
  });

  // Load email from storage (same intent as cookie on web)
  useEffect(() => {
    (async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) setEmail(storedEmail);
    })();
  }, []);

  const validateEmail = (value: string) => {
    const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!value.trim()) return "Email is required";
    if (!regex.test(value)) return "Enter a valid email";
    return "";
  };

  const handleSubmit = async () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;

    if (!realm) {
      alert("Organization not found");
      return;
    }

    mutate({ email, realm });
  };

  const handleResendLink = async () => {
    if (isPending || resending) return;
    setResending(true);
    await handleSubmit();
    setResending(false);
  };

  return (
    <TouchableWithoutFeedback
      // onPress={() => {
      //   Keyboard.dismiss();
      // }}
    >
      <View
        style={{
          width: "100%",
          padding: theme.spacing(2),
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.h1,
            fontWeight: "700",
            color: theme.colors.textPrimary,
            textAlign: "center",
            marginBottom: theme.spacing(1),
          }}
        >
          Forgot your password
        </Text>

        <Text
          style={{
            fontSize: theme.typography.body,
            color: theme.colors.textSecondary,
            textAlign: "center",
            marginBottom: theme.spacing(3),
          }}
        >
          Enter your email to receive a reset link
        </Text>

        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError("");
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: emailError
              ? theme.colors.error
              : theme.colors.border,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing(1.5),
            marginBottom: emailError
              ? theme.spacing(0.5)
              : theme.spacing(2),
            color: theme.colors.textPrimary,
          }}
        />

        {emailError ? (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.caption,
              marginBottom: theme.spacing(1),
            }}
          >
            {emailError}
          </Text>
        ) : null}

        <Button
          title={isPending ? "Sending..." : "Send Reset Link"}
          onPress={handleSubmit}
          color={theme.colors.primary}
          disabled={isPending || resending}
        />

        {isPending && (
          <ActivityIndicator
            style={{ marginTop: theme.spacing(1) }}
            color={theme.colors.primary}
          />
        )}

        <View
          style={{
            marginTop: theme.spacing(3),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: theme.colors.textPrimary,
                textDecorationLine: "underline",
              }}
            >
              Back to login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendLink}
            disabled={isPending || resending}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,
                textDecorationLine: "underline",
                opacity: isPending || resending ? 0.6 : 1,
              }}
            >
              {resending ? "Resending..." : "Resend link"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
