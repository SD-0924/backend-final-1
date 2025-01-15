package com.education.iLearn

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.education.iLearn.presentation.Onboarding.OnboardingScreen
import com.education.iLearn.presentation.SplashScreen.SplashScreen
import com.education.iLearn.ui.theme.ILearnTheme
import com.example.ilearn.R
import com.google.firebase.FirebaseApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FirebaseApp.initializeApp(this)
        setContent {
            ILearnTheme {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = "splash") {
                    composable("splash") {
                        SplashScreen(navigateToOnboarding = {
                            navController.navigate("onboarding") {
                                // Ensure the splash screen is removed from the back stack
                                popUpTo("splash") { inclusive = true }
                            }
                        })
                    }
                    composable("onboarding") {
                        OnboardingScreen(onLoginClick = {
                            navController.navigate("home") {
                                // Clear back stack after onboarding to prevent navigating back
                                popUpTo("onboarding") { inclusive = true }
                            }
                        })
                    }
                    composable("home") {
                        HomeScreen()
                    }
                }
            }
        }
    }
}

@Composable
fun HomeScreen() {
    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        Greeting(
            name = "Android",
            modifier = Modifier.padding(innerPadding)
        )
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = stringResource(id = R.string.feedback_view_info),
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    ILearnTheme {
        Greeting("Android")
    }
}
