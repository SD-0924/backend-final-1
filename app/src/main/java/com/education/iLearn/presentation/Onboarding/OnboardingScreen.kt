package com.education.iLearn.presentation.Onboarding

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.education.iLearn.ui.theme.Purple80
import com.example.ilearn.R
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.education.iLearn.presentation.component.CustomButton
import com.google.accompanist.pager.*
import com.education.iLearn.presentation.component.CustomText

@OptIn(ExperimentalFoundationApi::class, ExperimentalPagerApi::class)
@Composable
fun OnboardingScreen(onLoginClick: () -> Unit) {
    val context = LocalContext.current
    val images = listOf(R.drawable.payment, R.drawable.scheduling, R.drawable.payment)
    val pagerState = rememberPagerState(initialPage = 0)
    val texts = listOf(
        stringResource(id = R.string.workflow_view_tab_meeting_title),
        stringResource(id = R.string.workflow_view_tab_scheduling_title),
        stringResource(id = R.string.workflow_view_tab_payment_title)
    )
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(brush = Brush.verticalGradient(
                colors = listOf(Color.White, Color(0xFF06A66C))
            )
            )
            .padding(horizontal = 17.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {

        HorizontalPager(
            count = images.size,
            state = pagerState,
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            reverseLayout = false
        ) { page ->
            Box(
                modifier = Modifier.fillMaxSize()
            ) {
                // Image
                Image(
                    painter = painterResource(id = images[page]),
                    contentDescription = null,
                    modifier = Modifier.fillMaxWidth()
                        .align(Alignment.Center)
                )
                // Text under the image
                Text(
                    text = texts[page],
                    fontSize = 18.sp,
                    color = Color.White,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 90.dp)
                        .align(Alignment.BottomCenter)
                        .wrapContentWidth(Alignment.CenterHorizontally)
                )
            }
        }

        HorizontalPagerIndicator(
            pagerState = pagerState,
            modifier = Modifier
                .align(Alignment.CenterHorizontally)
                .padding(bottom = screenHeight * 0.05f),
            activeColor = Color.White,
            inactiveColor = Color.Gray
        )

        CustomButton(
            onClick = onLoginClick,
            text = stringResource(id = R.string.workflow_view_login_button_title),
            backgroundColor = Color.White,
            textColor = Color.Black,
        )
    }
}

@Preview(showBackground = true)
@Composable
fun OnboardingScreenPreview() {
    OnboardingScreen(onLoginClick = {})
}