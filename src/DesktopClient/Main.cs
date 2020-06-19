using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using IdentityModel.Client;

namespace DesktopClient
{
    public partial class Main : Form
    {
        private StringBuilder responseBuffer;

        public Main()
        {
            this.responseBuffer = new StringBuilder();
            InitializeComponent();
        }

        private async void login_Click(object sender, EventArgs e)
        {
            var accessToken = await TokenProvider.RetrieveToken(Common.Config.IdentityServerUrl);
            accessTokenLabel.Text = @"Logged in.";
            accessTokenTextBox.Text = accessToken;
            loadTimeButton.Enabled = true;
        }

        private async void loadTimeButton_Click(object sender, EventArgs e)
        {
            var httpClientHandler = Common.HttpClientExtensions.CreateHttpClientHandler(true);
            var httpClient = new HttpClient(httpClientHandler)
            {
                BaseAddress = new Uri(Common.Config.ApiUrl),
            };
            httpClient.SetBearerToken(accessTokenTextBox.Text);

            var response = await httpClient.GetAsync($"/api/time");
            if (!response.IsSuccessStatusCode)
            {

                MessageBox.Show(response.ReasonPhrase);
            }
            else
            {
                var content = await response.Content.ReadAsStringAsync();
                responseBuffer.Append(content);
                responseTextBox.Text = responseBuffer.ToString();
            }
        }
    }
}
