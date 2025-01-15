package com.education.iLearn.presentation.SplashScreen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import com.education.iLearn.presentation.component.CustomText
import com.education.iLearn.ui.theme.Purple80
import com.example.ilearn.R

@Composable
fun SplashScreen(navigateToOnboarding: () -> Unit) {
    LaunchedEffect(Unit) {
        delay(2000)
        navigateToOnboarding()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Purple80),
        contentAlignment = Alignment.Center
    ) {
        CustomText(
            text = stringResource(id = R.string.app_name),
            fontSize = 32,
            color = Color.White,
            modifier = Modifier.padding(vertical = 4.dp),
        )
        CircularProgressIndicator(
            color = Color.White,
            modifier = Modifier.padding(top = 70.dp)
        )
    }
}
@Preview
@Composable
fun SplashScreenPreview() {
    Surface(modifier = Modifier.fillMaxSize()) {
        SplashScreen(navigateToOnboarding = {})
    }
}