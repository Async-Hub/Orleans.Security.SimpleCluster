namespace DesktopClient
{
    partial class Main
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.login = new System.Windows.Forms.Button();
            this.accessTokenLabel = new System.Windows.Forms.Label();
            this.accessTokenTextBox = new System.Windows.Forms.TextBox();
            this.responseTextBox = new System.Windows.Forms.TextBox();
            this.loadTimeButton = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // login
            // 
            this.login.Location = new System.Drawing.Point(591, 448);
            this.login.Name = "login";
            this.login.Size = new System.Drawing.Size(75, 38);
            this.login.TabIndex = 0;
            this.login.Text = "Login";
            this.login.UseVisualStyleBackColor = true;
            this.login.Click += new System.EventHandler(this.login_Click);
            // 
            // accessTokenLabel
            // 
            this.accessTokenLabel.AutoSize = true;
            this.accessTokenLabel.Location = new System.Drawing.Point(12, 9);
            this.accessTokenLabel.Name = "accessTokenLabel";
            this.accessTokenLabel.Size = new System.Drawing.Size(70, 15);
            this.accessTokenLabel.TabIndex = 1;
            this.accessTokenLabel.Text = "Logged Out";
            // 
            // accessTokenTextBox
            // 
            this.accessTokenTextBox.Location = new System.Drawing.Point(12, 42);
            this.accessTokenTextBox.Multiline = true;
            this.accessTokenTextBox.Name = "accessTokenTextBox";
            this.accessTokenTextBox.Size = new System.Drawing.Size(654, 145);
            this.accessTokenTextBox.TabIndex = 2;
            // 
            // responseTextBox
            // 
            this.responseTextBox.Location = new System.Drawing.Point(12, 193);
            this.responseTextBox.Multiline = true;
            this.responseTextBox.Name = "responseTextBox";
            this.responseTextBox.Size = new System.Drawing.Size(654, 220);
            this.responseTextBox.TabIndex = 2;
            // 
            // loadTimeButton
            // 
            this.loadTimeButton.Enabled = false;
            this.loadTimeButton.Location = new System.Drawing.Point(497, 448);
            this.loadTimeButton.Name = "loadTimeButton";
            this.loadTimeButton.Size = new System.Drawing.Size(88, 38);
            this.loadTimeButton.TabIndex = 3;
            this.loadTimeButton.Text = "Load Time";
            this.loadTimeButton.UseVisualStyleBackColor = true;
            this.loadTimeButton.Click += new System.EventHandler(this.loadTimeButton_Click);
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(678, 498);
            this.Controls.Add(this.loadTimeButton);
            this.Controls.Add(this.responseTextBox);
            this.Controls.Add(this.accessTokenTextBox);
            this.Controls.Add(this.accessTokenLabel);
            this.Controls.Add(this.login);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Name = "Main";
            this.Text = "Desktop Client";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button login;
        private System.Windows.Forms.Label accessTokenLabel;
        private System.Windows.Forms.TextBox accessTokenTextBox;
        private System.Windows.Forms.TextBox responseTextBox;
        private System.Windows.Forms.Button loadTimeButton;
    }
}

