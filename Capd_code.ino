int trig = 2;                                                            
int echo = 4;
int RED = 13;                                                                 
int YELLOW = 12;                                                           
int GREEN = 14;                                                            

void setup()
{
  Serial.begin(9600);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(RED, OUTPUT);                                          
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
}

void loop()
{
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  int distance = pulseIn(echo, HIGH)/29/2;
  Serial.print(distance);
  Serial.println("cm");
  delay(100);
  if (distance > 60)                                                   
  {
    digitalWrite(GREEN, HIGH);
    delay(100);
    digitalWrite(GREEN, LOW);                              
    digitalWrite(YELLOW, HIGH);
    delay(100);    
    digitalWrite(YELLOW, LOW);                               
    digitalWrite(RED, HIGH);
    delay(100);
    digitalWrite(RED,LOW);
    digitalWrite(YELLOW, HIGH);
    delay(100);      
    digitalWrite(YELLOW, LOW);                                     
  }
  if (distance > 20 & distance <= 40)                            
  {
    digitalWrite(GREEN, HIGH);
    delay(1000);
    digitalWrite(GREEN, LOW);                              
    digitalWrite(YELLOW, HIGH);
    delay(1000);    
    digitalWrite(YELLOW, LOW);                               
    digitalWrite(RED, HIGH);
    delay(1000);
    digitalWrite(RED,LOW);
    digitalWrite(YELLOW, HIGH);
    delay(1000);      
    digitalWrite(YELLOW, LOW);  
  }
  if (distance > 0 & distance <= 10)
  {
    digitalWrite(GREEN, HIGH);
    digitalWrite(YELLOW, HIGH);
    digitalWrite(RED, HIGH);
    delay(1000);
    digitalWrite(GREEN, LOW);
    digitalWrite(YELLOW, LOW);
    digitalWrite(RED, LOW);
  }
}
