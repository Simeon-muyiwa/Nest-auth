FROM quay.io/operator-framework/ansible-operator:v1.33.0

# Set environment variables
ENV HOME /home/ansible

# Switch to root user to create a non-root user
USER root

# Create the home directory and a non-root user with a specific UID
RUN mkdir -p ${HOME} && useradd -u 1003 -m ansible-user

# Set permissions for the home directory
RUN chown -R 1003:1003 ${HOME}

# Switch to the non-root user with the numeric UID
USER 1003

# Set the working directory
WORKDIR ${HOME}

# Copy requirements.yml and install collections as the non-root user
COPY requirements.yml ${HOME}/requirements.yml
RUN ansible-galaxy collection install -r ${HOME}/requirements.yml && chmod -R ug+rwx ${HOME}/.ansible

# Copy other necessary files
COPY watches.yaml ${HOME}/watches.yaml
COPY roles/ ${HOME}/roles/
COPY playbooks/ ${HOME}/playbooks/