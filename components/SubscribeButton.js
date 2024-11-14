import { useState } from 'react';
import styles from '../styles/button.module.css';

export default function SubscribeButton({
  text = "Subscribe Now",
  color = "#38A56F",         // Default background color
  hoverColor = "#2E7D32",    // Default hover background color
  padding = "1rem 4rem",     // Default padding
  textColor = "#ffffff",     // Default text color
  borderRadius = "12px",     // Default border radius
  fontWeight = "600",        // Default font weight
  fontSize = "1.2rem"        // Default font size
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isFullWidth = padding === "parentWidth";

  return (
    <button
      className={styles.subscribeButton}
      style={{
        backgroundColor: isHovered ? hoverColor : color,
        color: textColor,
        padding: isFullWidth ? "1rem 0" : padding,
        width: isFullWidth ? "100%" : "auto",
        borderRadius: borderRadius,
        fontWeight: fontWeight,
        fontSize: fontSize,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
}


/**
 * SubscribeButton Component
 * 
 * A customizable button component that displays a text label and applies 
 * various styling options including color, padding, and hover effects. 
 * The component accepts multiple parameters for complete control over 
 * its appearance and behavior.
 * 
 * Props:
 * - text (string): The text to display on the button. Defaults to "Subscribe Now".
 * - color (string): The background color of the button. Defaults to "#38A56F".
 * - hoverColor (string): The background color when the button is hovered. Defaults to "#2E7D32".
 * - padding (string): The padding inside the button. Defaults to "1rem 4rem". 
 *   - If set to "parentWidth", the button will expand to fill the width of its parent container.
 * - textColor (string): The color of the button text. Defaults to "#ffffff" (white).
 * - borderRadius (string): The border radius of the button. Controls the roundness of the button's corners. Defaults to "12px".
 * - fontWeight (string | number): The font weight of the button text, controlling the boldness. Defaults to "600".
 * - fontSize (string): The font size of the button text. Defaults to "1.2rem".
 * 
 * Example Usage:
 * <SubscribeButton 
 *    text="Join Now" 
 *    color="#FF5733" 
 *    hoverColor="#C70039" 
 *    padding="1rem 2rem" 
 *    textColor="#ffffff" 
 *    borderRadius="8px" 
 *    fontWeight="700" 
 *    fontSize="1rem" 
 * />
 * 
 * Example with Full-Width:
 * <SubscribeButton 
 *    text="Join Now"
 *    padding="parentWidth"  // Button will expand to fill the width of its parent
 * />
 * 
 * This component uses inline styles for dynamic styling based on the provided props.
 */