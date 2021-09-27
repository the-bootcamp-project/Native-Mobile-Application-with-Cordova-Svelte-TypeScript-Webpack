FROM tbcp/nodejs:ubuntu

USER bootcamp

# Install curl, git, software-properties-common, python, nodejs, cordova
RUN sudo apt update && sudo apt install -y software-properties-common git curl wget python

WORKDIR /home/bootcamp/

# Install OpenJDK
RUN sudo apt install -y openjdk-8-jre && \
    sudo apt install ca-certificates-java && \
    sudo apt clean && \
    sudo update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/

# Install Android SDK
RUN sudo apt install -y android-sdk

#Set ANDROID_SDK_ROOT environment variable
ENV ANDROID_SDK_ROOT /usr/lib/android-sdk

RUN wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip && \
    unzip commandlinetools-linux-6609375_latest.zip -d cmdline-tools && \
    sudo mv cmdline-tools $ANDROID_SDK_ROOT/

#Add ANDROID_SDK_ROOT to PATH
ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$PATH

RUN sudo yarn global add cordova --prefix /usr/local
