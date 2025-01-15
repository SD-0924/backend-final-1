package com.education.iLearn.presentation.component

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import com.education.iLearn.ui.theme.ZapfinoFontFamily
import com.education.iLearn.presentation.component.CustomText

@Composable
fun CustomText(
    text: String,
    fontSize: Int = 30,
    color: Color = Color.White,
    textAlign: TextAlign? = null,
    modifier: Modifier
) {
    Text(
        text = text,
        fontSize = fontSize.sp,
        color = color,
        fontWeight = FontWeight.Bold,
        fontFamily = ZapfinoFontFamily,
        textAlign = textAlign,
        modifier = modifier,
    )
}