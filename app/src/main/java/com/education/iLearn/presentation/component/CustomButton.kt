package com.education.iLearn.presentation.component


import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.education.iLearn.ui.theme.Purple80

@Composable
fun CustomButton(
    onClick: () -> Unit,
    text: String,
    backgroundColor: Color = Color.White,
    textColor: Color = Purple80,
    buttonHeight: Dp = 90.dp,
    padding: Modifier = Modifier.padding(0.dp),
    isLoading: Boolean = false
) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = backgroundColor),
        shape = RoundedCornerShape(10.dp),
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 40.dp, max = buttonHeight)
            .padding(10.dp)
            .shadow(
                8.dp,
                shape = if (buttonHeight <= 70.dp) RoundedCornerShape(50.dp) else RoundedCornerShape(16.dp)
            )
    ) {
        Text(
            text = if (isLoading) "Loading..." else text,
            fontSize = if (buttonHeight <= 70.dp) 15.sp else 18.sp,
            color = textColor,
            modifier = Modifier.padding(vertical = if (buttonHeight <= 70.dp) 0.dp else 4.dp)
        )
    }
}

@Preview(showBackground = true)
@Composable
fun CustomButtonPreview() {
    CustomButton(
        onClick = { /* Handle click here */ },
        text = "Click Me",
        backgroundColor = Purple80,
        textColor = Color.White,
        isLoading = false
    )
}
