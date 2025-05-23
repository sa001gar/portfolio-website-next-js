import Link from "next/link"
import { notFound } from "next/navigation"
import { TerminalWindow } from "@/components/terminal-window"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react"

// Mock blog posts data - in a real app, this would come from a database or CMS
const posts = [
  {
    id: 1,
    title: "Building Secure APIs with FastAPI and JWT",
    slug: "building-secure-apis-fastapi-jwt",
    excerpt:
      "Learn how to implement JWT authentication in FastAPI to create secure and scalable APIs for your applications.",
    content: `
# Building Secure APIs with FastAPI and JWT

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. In this tutorial, we'll explore how to implement JWT (JSON Web Token) authentication in FastAPI to create secure and scalable APIs.

## What is JWT?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

## Setting Up FastAPI

First, let's install the necessary packages:

\`\`\`bash
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart
\`\`\`

## Creating the JWT Authentication System

Let's start by defining our JWT configuration:

\`\`\`python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# JWT Configuration
SECRET_KEY = "your-secret-key"  # In production, use a secure random key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Function to hash password
def get_password_hash(password):
    return pwd_context.hash(password)
\`\`\`

## Creating and Verifying Tokens

Now, let's implement functions to create and verify JWT tokens:

\`\`\`python
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Here you would typically fetch the user from your database
    # For this example, we'll just return the username
    return {"username": username}
\`\`\`

## Implementing the Login Endpoint

Let's create an endpoint for users to authenticate and receive a JWT token:

\`\`\`python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

app = FastAPI()

# Mock user database
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret"
        "disabled": False,
    }
}

class Token(BaseModel):
    access_token: str
    token_type: str

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
\`\`\`

## Protecting Routes with JWT Authentication

Now we can create protected routes that require a valid JWT token:

\`\`\`python
class User(BaseModel):
    username: str
    email: str
    full_name: str
    disabled: bool = None

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/protected-resource")
async def protected_resource(current_user: User = Depends(get_current_user)):
    return {"message": "This is a protected resource", "user": current_user}
\`\`\`

## Conclusion

In this tutorial, we've implemented a secure JWT authentication system in FastAPI. This approach provides a stateless, scalable way to handle user authentication in your API.

Remember to always use HTTPS in production to ensure the security of your tokens during transmission. Also, consider using a more secure method for storing your SECRET_KEY, such as environment variables or a secure vault service.

For more advanced scenarios, you might want to implement refresh tokens, role-based access control, or integrate with third-party authentication providers.
    `,
    date: new Date("2023-11-15"),
    readTime: "8 min read",
    author: "Sagar Kundu",
    tags: ["FastAPI", "Security", "Python", "JWT", "API"],
    relatedPosts: [2, 3],
  },
  {
    id: 2,
    title: "Machine Learning for Anomaly Detection in Network Traffic",
    slug: "ml-anomaly-detection-network-traffic",
    excerpt:
      "Explore how machine learning algorithms can be used to detect unusual patterns and potential security threats in network traffic.",
    content: `
# Machine Learning for Anomaly Detection in Network Traffic

Network security is a critical concern for organizations of all sizes. With the increasing sophistication of cyber attacks, traditional rule-based security systems are no longer sufficient. This is where machine learning comes in, offering powerful techniques for identifying anomalies in network traffic that might indicate security threats.

## The Challenge of Network Security

Modern networks generate massive amounts of traffic data, making it impossible for human analysts to manually review everything. Additionally, new attack vectors are constantly emerging, which means static rule-based systems quickly become outdated.

## How Machine Learning Helps

Machine learning algorithms can process large volumes of network traffic data, learn normal patterns, and identify deviations that might represent security threats. Unlike rule-based systems, ML models can adapt to new patterns and detect previously unknown attack types.

## Common ML Approaches for Network Anomaly Detection

### 1. Supervised Learning

In supervised learning, we train models on labeled datasets where normal and anomalous traffic patterns are already identified.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Assuming X contains features extracted from network traffic
# and y contains labels (0 for normal, 1 for anomalous)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train a Random Forest classifier
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Evaluate the model
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))
\`\`\`

### 2. Unsupervised Learning

Unsupervised learning is particularly valuable for network security because it can detect novel attacks without requiring labeled training data.

\`\`\`python
from sklearn.ensemble import IsolationForest

# Train an Isolation Forest model
clf = IsolationForest(contamination=0.01)  # Assuming 1% of traffic is anomalous
clf.fit(X)

# Predict anomalies
# -1 for anomalies, 1 for normal traffic
predictions = clf.predict(X)
\`\`\`

### 3. Deep Learning Approaches

Deep learning models like autoencoders can learn complex patterns in network traffic.

\`\`\`python
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense

# Define the autoencoder architecture
input_dim = X.shape[1]
encoding_dim = 32

input_layer = Input(shape=(input_dim,))
encoder = Dense(encoding_dim, activation='relu')(input_layer)
decoder = Dense(input_dim, activation='sigmoid')(encoder)
autoencoder = Model(inputs=input_layer, outputs=decoder)

autoencoder.compile(optimizer='adam', loss='mse')

# Train the autoencoder on normal traffic only
X_normal = X[y == 0]
autoencoder.fit(X_normal, X_normal, epochs=50, batch_size=256, shuffle=True, validation_split=0.2)

# Detect anomalies based on reconstruction error
reconstructions = autoencoder.predict(X)
mse = np.mean(np.power(X - reconstructions, 2), axis=1)
anomaly_scores = mse
\`\`\`

## Feature Engineering for Network Traffic

Effective feature engineering is crucial for network anomaly detection. Some useful features include:

1. **Statistical features**: Packet size statistics, inter-arrival times, flow duration
2. **Protocol-specific features**: TCP flags, HTTP request patterns, DNS query types
3. **Connection-based features**: Number of connections to the same destination, connection failure rates
4. **Time-based features**: Traffic patterns over different time windows

## Real-world Implementation Considerations

When implementing ML-based anomaly detection for network security:

1. **Balance between false positives and false negatives**: Tune your model to minimize false alarms while still catching real threats
2. **Real-time processing**: Use streaming data processing frameworks like Kafka and Spark for real-time analysis
3. **Explainability**: Use techniques that provide insights into why something was flagged as anomalous
4. **Continuous learning**: Regularly update your models with new data to adapt to evolving threats

## Conclusion

Machine learning offers powerful tools for detecting anomalies in network traffic, enabling organizations to identify and respond to security threats more effectively than traditional methods. By combining different ML approaches and carefully engineering relevant features, security teams can build robust systems that adapt to evolving threats and provide early warning of potential attacks.

As cyber threats continue to evolve, the integration of machine learning into network security will become increasingly important, providing a dynamic defense against sophisticated attackers.
    `,
    date: new Date("2023-10-22"),
    readTime: "12 min read",
    author: "Sagar Kundu",
    tags: ["Machine Learning", "Cybersecurity", "Python", "TensorFlow", "Network Security"],
    relatedPosts: [1, 4],
  },
  {
    id: 3,
    title: "Optimizing Next.js Applications for Performance",
    slug: "optimizing-nextjs-applications-performance",
    excerpt:
      "Practical techniques to improve the performance of your Next.js applications, from code splitting to image optimization.",
    content: "Full content for Next.js optimization article...",
    date: new Date("2023-09-18"),
    readTime: "10 min read",
    author: "Sagar Kundu",
    tags: ["Next.js", "Performance", "React", "Web Development", "JavaScript"],
    relatedPosts: [1, 5],
  },
  {
    id: 4,
    title: "Containerization Best Practices with Docker and Kubernetes",
    slug: "containerization-best-practices-docker-kubernetes",
    excerpt:
      "Learn the best practices for containerizing your applications with Docker and orchestrating them with Kubernetes.",
    content: "Full content for Docker and Kubernetes article...",
    date: new Date("2023-08-05"),
    readTime: "15 min read",
    author: "Sagar Kundu",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers", "Cloud"],
    relatedPosts: [2, 5],
  },
  {
    id: 5,
    title: "Building a Real-time Dashboard with React and WebSockets",
    slug: "real-time-dashboard-react-websockets",
    excerpt:
      "A step-by-step guide to creating a real-time dashboard using React for the frontend and WebSockets for live data updates.",
    content: "Full content for real-time dashboard article...",
    date: new Date("2023-07-12"),
    readTime: "11 min read",
    author: "Sagar Kundu",
    tags: ["React", "WebSockets", "JavaScript", "Real-time", "Dashboard"],
    relatedPosts: [3, 4],
  },
]

// Function to get post by slug
function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

// Function to get related posts
function getRelatedPosts(postIds: number[]) {
  return posts.filter((post) => postIds.includes(post.id))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.relatedPosts || [])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-terminal-green/70 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <TerminalWindow title={`${post.slug}.md`} className="mb-8">
            <div className="prose prose-invert prose-terminal max-w-none">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-terminal-bright mb-4 mt-6">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-terminal-bright mb-3 mt-6">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-terminal-bright mb-3 mt-5">$1</h3>')
                    .replace(/\n/g, "<br />")
                    .replace(
                      /```([a-z]*)\n([\s\S]*?)```/g,
                      '<pre class="bg-terminal-black/50 p-4 rounded-md overflow-x-auto border border-terminal-green/20 my-4"><code class="language-$1">$2</code></pre>',
                    ),
                }}
              />
            </div>
          </TerminalWindow>

          {/* Author Bio */}
          <div className="border border-terminal-green/20 rounded-md p-5 bg-terminal-green/5 mb-8">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-terminal-bright" />
              </div>
              <div>
                <h3 className="text-terminal-bright font-bold">{post.author}</h3>
                <p className="text-terminal-green/70 text-sm">Software Engineer & Technical Writer</p>
              </div>
            </div>
            <p className="text-terminal-green/80 text-sm">
              Sagar is a software engineer specializing in full-stack development, machine learning, and cybersecurity.
              He shares his knowledge and experiences through articles and open-source contributions.
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-terminal-green/20 pt-8">
              <h2 className="text-xl font-bold text-terminal-bright mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all hover:bg-terminal-green/5">
                      <h3 className="text-terminal-bright font-medium group-hover:text-terminal-bright mb-1">
                        {relatedPost.title}
                      </h3>
                      <p className="text-terminal-green/70 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
