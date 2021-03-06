# Functions 
## 1x1_square(size, color back, color front, x, y) 
    void 1x1_square(size, color_back, color_front, x, y)
    {
        fill(back);
        rect(x*cote, y*cote, size); 
        fill(front); 
        // code shape (vect);
    }

## 4x4_square(size, color A, color B, x, y, orientation) 

    void 4x4_square(size, color_A, color_B, x, y)
    {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
            
                x = i+size;
                y = j+size;
                
                if (i == 0 && j == 0) {
                    1x1_square(size, A, B, x, y);
                }
                
                else {
                    if (i == 0 && j == 1) {
                        rotate(radians(180));
                    }
                    else if (i == 1 && j == 1) {
                        rotate(radians(270)); 
                    }
                    else {
                        scale(-1,1); 
                    }
                    
                    1x1_square(size, B, A, x, y)             
                }
            }
        }
    }
        
# Main 

    color_bg;
    color_front;

    for (let i = 0; i < 2; i++) { 
        for (let j = 0; j <2 ; j++) { 
            if (i == j) {
                Color_bg = black;
                Color_front = white;
            }
            else {  
                color_bg = white;
                color_front = black;
            }
            
            4x4_square(size, Color_front, Color_back, x, y) 
            
            Rotate(radians(90)); // rotate next shape
            
        }
    }
