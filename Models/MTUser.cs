using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace MyTime.Models
{
  public class MTUser
  {
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public int UserId { get; set; }

    public void Save()
    {

    }

    public static int verifyUserLogin(string inputUserName, string inputPassword)
    {
      MySqlConnection conn = DB.Connection();
      conn.Open();

      var cmd = conn.CreateCommand() as MySqlCommand;
      cmd.CommandText = @"SELECT * FROM users WHERE user_name = (@input);";
      cmd.Parameters.Add(new MySqlParameter("@input", inputUserName));

      int userId = 0;
      string userName = null;
      string password = null;
      string email = null;
      var rdr = cmd.ExecuteReader() as MySqlDataReader;
      while(rdr.Read())
      {
        userId = rdr.GetInt32(0);
        userName = rdr.GetString(1);
        password = rdr.GetString(2);
        email = rdr.GetString(3);
      }

      conn.Close();
      if (conn != null)
      {
        conn.Dispose();
      }
      Console.WriteLine(userName);
      Console.WriteLine(password);
      if(userName != inputUserName)
      {
        return 1;
      }
      else if(password != inputPassword)
      {
        return 2;
      }
      else
      {
        return 3;
      }
    }

    // public static MTUser returnMTUserViaLoginInput(string inputMTUserName, string inputPassword)
    // {
    //
    // }

  }


}
